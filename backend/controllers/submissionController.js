import mongoose from "mongoose";
import { Readable } from "stream";
import PaperSubmission from "../models/PaperSubmission.js";
import getGridFSBucket from "../config/gridfs.js";
import { generateSubmissionId } from "../utils/generateId.js";
import asyncHandler, { ApiError } from "../utils/asyncHandler.js";

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "affiliation",
  "country",
  "corrFullName",
  "corrEmail",
  "paperTitle",
  "researchArea",
  "abstract",
  "keywords",
  "presentationType",
];

function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid submission ID.");
  }
}

async function storeFileInGridFS(file) {
  if (!file) return null;

  const bucket = getGridFSBucket();

  const gridFsId = await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    Readable.from(file.buffer).pipe(uploadStream);

    uploadStream.on("finish", () => resolve(uploadStream.id));
    uploadStream.on("error", reject);
  });

  return {
    gridFsId,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  };
}

async function deleteFileFromGridFS(gridFsId) {
  if (!gridFsId) return;

  try {
    const bucket = getGridFSBucket();
    await bucket.delete(new mongoose.Types.ObjectId(gridFsId));
  } catch (error) {
    // File may already be gone - do not crash the request over cleanup.
    console.warn("[submissions] Failed to delete GridFS file:", error.message);
  }
}

// POST /api/submissions (public)
export const createSubmission = asyncHandler(async (req, res) => {
  const body = req.body || {};

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.toString().trim());

  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(", ")}`);
  }

  if (body.agree !== "true" && body.agree !== true) {
    throw new ApiError(400, "You must agree to the Submission Guidelines and Terms & Conditions.");
  }

  const manuscript = req.files?.manuscriptFile?.[0];

  if (!manuscript) {
    throw new ApiError(400, "A manuscript file (PDF, DOC or DOCX) is required.");
  }

  const coverLetter = req.files?.coverLetterFile?.[0];

  const submissionId = await generateSubmissionId();

  const manuscriptFile = await storeFileInGridFS(manuscript);
  const coverLetterFile = coverLetter ? await storeFileInGridFS(coverLetter) : undefined;

  const submission = await PaperSubmission.create({
    submissionId,
    fullName: body.fullName.trim(),
    email: body.email.trim().toLowerCase(),
    affiliation: body.affiliation.trim(),
    country: body.country.trim(),
    correspondingAuthor: {
      fullName: body.corrFullName.trim(),
      email: body.corrEmail.trim().toLowerCase(),
      phone: body.corrPhone?.trim() || "",
      address: body.corrAddress?.trim() || "",
    },
    paperTitle: body.paperTitle.trim(),
    researchArea: body.researchArea.trim(),
    abstract: body.abstract.trim(),
    keywords: body.keywords.trim(),
    presentationType: body.presentationType.trim(),
    manuscriptFile,
    coverLetterFile,
    notes: body.notes?.trim() || "",
    status: "new",
  });

  res.status(201).json({
    success: true,
    message: "Your paper has been submitted successfully.",
    submissionId: submission.submissionId,
  });
});

// GET /api/admin/submissions
export const listSubmissions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { paperTitle: { $regex: search, $options: "i" } },
      { submissionId: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

  const [items, total] = await Promise.all([
    PaperSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    PaperSubmission.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum) || 1,
    },
  });
});

// GET /api/admin/submissions/:id
export const getSubmission = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const submission = await PaperSubmission.findById(req.params.id);

  if (!submission) {
    throw new ApiError(404, "Submission not found.");
  }

  res.status(200).json({ success: true, data: submission });
});

// PATCH /api/admin/submissions/:id/status
export const updateSubmissionStatus = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const { status } = req.body;

  const validStatuses = [
    "new",
    "under_review",
    "accepted",
    "revision_required",
    "rejected",
    "published",
  ];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value.");
  }

  const submission = await PaperSubmission.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!submission) {
    throw new ApiError(404, "Submission not found.");
  }

  res.status(200).json({
    success: true,
    message: "Submission status updated.",
    data: submission,
  });
});

// DELETE /api/admin/submissions/:id
export const deleteSubmission = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const submission = await PaperSubmission.findById(req.params.id);

  if (!submission) {
    throw new ApiError(404, "Submission not found.");
  }

  await deleteFileFromGridFS(submission.manuscriptFile?.gridFsId);
  await deleteFileFromGridFS(submission.coverLetterFile?.gridFsId);

  await submission.deleteOne();

  res.status(200).json({
    success: true,
    message: "Submission deleted successfully.",
  });
});

async function streamFile(res, gridFsId, originalName, mimeType) {
  if (!gridFsId) {
    throw new ApiError(404, "File not found for this submission.");
  }

  const bucket = getGridFSBucket();

  res.set("Content-Type", mimeType || "application/octet-stream");
  res.set(
    "Content-Disposition",
    `inline; filename="${(originalName || "file").replace(/"/g, "")}"`
  );

  const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(gridFsId));

  downloadStream.on("error", () => {
    if (!res.headersSent) {
      res.status(404).json({ success: false, message: "File not found." });
    }
  });

  downloadStream.pipe(res);
}

// GET /api/admin/submissions/:id/manuscript
export const downloadManuscript = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const submission = await PaperSubmission.findById(req.params.id);

  if (!submission) {
    throw new ApiError(404, "Submission not found.");
  }

  await streamFile(
    res,
    submission.manuscriptFile?.gridFsId,
    submission.manuscriptFile?.originalName,
    submission.manuscriptFile?.mimeType
  );
});

// GET /api/admin/submissions/:id/cover-letter
export const downloadCoverLetter = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const submission = await PaperSubmission.findById(req.params.id);

  if (!submission) {
    throw new ApiError(404, "Submission not found.");
  }

  await streamFile(
    res,
    submission.coverLetterFile?.gridFsId,
    submission.coverLetterFile?.originalName,
    submission.coverLetterFile?.mimeType
  );
});

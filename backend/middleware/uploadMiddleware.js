import multer from "multer";
import env from "../config/env.js";
import { ApiError } from "../utils/asyncHandler.js";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXTENSION_REGEX = /\.(pdf|doc|docx)$/i;

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const extensionOk = ALLOWED_EXTENSION_REGEX.test(file.originalname);
  const mimeOk = ALLOWED_MIME_TYPES.has(file.mimetype);

  if (!extensionOk || !mimeOk) {
    cb(
      new ApiError(
        400,
        `Unsupported file type for "${file.originalname}". Only PDF, DOC and DOCX files are allowed.`
      )
    );
    return;
  }

  cb(null, true);
}

// Use the larger of the two limits at the multer layer; per-field size is
// re-validated precisely in the controller since multer applies one limit
// per upload.fields() call.
const maxSizeBytes =
  Math.max(env.MANUSCRIPT_MAX_SIZE_MB, env.COVER_LETTER_MAX_SIZE_MB) * 1024 * 1024;

export const uploadSubmissionFiles = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSizeBytes,
    files: 2,
  },
}).fields([
  { name: "manuscriptFile", maxCount: 1 },
  { name: "coverLetterFile", maxCount: 1 },
]);

/**
 * Wraps multer so upload errors (wrong type, too large, etc.) are
 * turned into clean JSON errors instead of crashing the server.
 */
export function handleUpload(req, res, next) {
  uploadSubmissionFiles(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(
          new ApiError(
            400,
            `File is too large. Manuscript max size is ${env.MANUSCRIPT_MAX_SIZE_MB}MB and cover letter max size is ${env.COVER_LETTER_MAX_SIZE_MB}MB.`
          )
        );
      }
      return next(new ApiError(400, `Upload error: ${err.message}`));
    }

    return next(err);
  });
}

/**
 * Validates each uploaded file's declared size against its specific
 * per-field maximum (manuscript vs cover letter), since multer only
 * enforces a single global limit.
 */
export function validateFileSizes(req, res, next) {
  const manuscript = req.files?.manuscriptFile?.[0];
  const coverLetter = req.files?.coverLetterFile?.[0];

  const manuscriptMax = env.MANUSCRIPT_MAX_SIZE_MB * 1024 * 1024;
  const coverLetterMax = env.COVER_LETTER_MAX_SIZE_MB * 1024 * 1024;

  if (manuscript && manuscript.size > manuscriptMax) {
    return next(
      new ApiError(400, `Manuscript file exceeds the maximum size of ${env.MANUSCRIPT_MAX_SIZE_MB}MB.`)
    );
  }

  if (coverLetter && coverLetter.size > coverLetterMax) {
    return next(
      new ApiError(400, `Cover letter file exceeds the maximum size of ${env.COVER_LETTER_MAX_SIZE_MB}MB.`)
    );
  }

  next();
}

export default handleUpload;

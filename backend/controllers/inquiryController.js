import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import { generateInquiryId } from "../utils/generateId.js";
import asyncHandler, { ApiError } from "../utils/asyncHandler.js";

function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid inquiry ID.");
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/inquiries (public)
export const createInquiry = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message, agree } = req.body || {};

  if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    throw new ApiError(400, "Full name, email, subject and message are required.");
  }

  if (!emailPattern.test(email)) {
    throw new ApiError(400, "Please enter a valid email address.");
  }

  if (agree !== true && agree !== "true") {
    throw new ApiError(400, "Please agree to the privacy policy.");
  }

  const inquiryId = await generateInquiryId();

  const inquiry = await Inquiry.create({
    inquiryId,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    status: "new",
  });

  res.status(201).json({
    success: true,
    message: "Thank you. Your message has been submitted successfully.",
    inquiryId: inquiry.inquiryId,
  });
});

// GET /api/admin/inquiries
export const listInquiries = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
      { inquiryId: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

  const [items, total] = await Promise.all([
    Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Inquiry.countDocuments(query),
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

// GET /api/admin/inquiries/:id
export const getInquiry = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  res.status(200).json({ success: true, data: inquiry });
});

// PATCH /api/admin/inquiries/:id
export const updateInquiry = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const { status } = req.body;

  const validStatuses = ["new", "read", "resolved"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value.");
  }

  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  res.status(200).json({
    success: true,
    message: "Inquiry updated.",
    data: inquiry,
  });
});

// DELETE /api/admin/inquiries/:id
export const deleteInquiry = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  res.status(200).json({
    success: true,
    message: "Inquiry deleted successfully.",
  });
});

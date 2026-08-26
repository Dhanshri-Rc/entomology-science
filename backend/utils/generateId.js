import PaperSubmission from "../models/PaperSubmission.js";
import Inquiry from "../models/Inquiry.js";

/**
 * Generates a professional, sequential, unique submission ID such as:
 * ESA-2026-000001
 */
export async function generateSubmissionId() {
  const year = new Date().getFullYear();
  const prefix = `ESA-${year}-`;

  const count = await PaperSubmission.countDocuments({
    submissionId: { $regex: `^${prefix}` },
  });

  const nextNumber = count + 1;
  const padded = String(nextNumber).padStart(6, "0");

  const candidate = `${prefix}${padded}`;

  // Guard against rare race conditions by checking uniqueness.
  const exists = await PaperSubmission.findOne({ submissionId: candidate });

  if (exists) {
    const fallback = `${prefix}${String(nextNumber + 1).padStart(6, "0")}-${Date.now()
      .toString()
      .slice(-4)}`;
    return fallback;
  }

  return candidate;
}

/**
 * Generates a unique inquiry ID such as: INQ-2026-000001
 */
export async function generateInquiryId() {
  const year = new Date().getFullYear();
  const prefix = `INQ-${year}-`;

  const count = await Inquiry.countDocuments({
    inquiryId: { $regex: `^${prefix}` },
  });

  const nextNumber = count + 1;
  const padded = String(nextNumber).padStart(6, "0");

  const candidate = `${prefix}${padded}`;

  const exists = await Inquiry.findOne({ inquiryId: candidate });

  if (exists) {
    const fallback = `${prefix}${String(nextNumber + 1).padStart(6, "0")}-${Date.now()
      .toString()
      .slice(-4)}`;
    return fallback;
  }

  return candidate;
}

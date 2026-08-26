import PaperSubmission from "../models/PaperSubmission.js";
import Inquiry from "../models/Inquiry.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/admin/dashboard
export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [
    totalSubmissions,
    newSubmissions,
    totalInquiries,
    newInquiries,
    recentSubmissions,
    recentInquiries,
  ] = await Promise.all([
    PaperSubmission.countDocuments(),
    PaperSubmission.countDocuments({ status: "new" }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: "new" }),
    PaperSubmission.find().sort({ createdAt: -1 }).limit(5),
    Inquiry.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalSubmissions,
      newSubmissions,
      totalInquiries,
      newInquiries,
      recentSubmissions,
      recentInquiries,
    },
  });
});

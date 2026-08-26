import express from "express";
import {
  createSubmission,
  listSubmissions,
  getSubmission,
  updateSubmissionStatus,
  deleteSubmission,
  downloadManuscript,
  downloadCoverLetter,
} from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { handleUpload, validateFileSizes } from "../middleware/uploadMiddleware.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const publicRouter = express.Router();
const adminRouter = express.Router();

// Public
publicRouter.post(
  "/submissions",
  submissionLimiter,
  handleUpload,
  validateFileSizes,
  createSubmission
);

// Admin (mounted under /api/admin)
adminRouter.use(protect, requireAdmin);
adminRouter.get("/submissions", listSubmissions);
adminRouter.get("/submissions/:id", getSubmission);
adminRouter.patch("/submissions/:id/status", updateSubmissionStatus);
adminRouter.delete("/submissions/:id", deleteSubmission);
adminRouter.get("/submissions/:id/manuscript", downloadManuscript);
adminRouter.get("/submissions/:id/cover-letter", downloadCoverLetter);

export { publicRouter as submissionPublicRoutes, adminRouter as submissionAdminRoutes };

import express from "express";
import {
  createInquiry,
  listInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { inquiryLimiter } from "../middleware/rateLimiter.js";

const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.post("/inquiries", inquiryLimiter, createInquiry);

adminRouter.use(protect, requireAdmin);
adminRouter.get("/inquiries", listInquiries);
adminRouter.get("/inquiries/:id", getInquiry);
adminRouter.patch("/inquiries/:id", updateInquiry);
adminRouter.delete("/inquiries/:id", deleteInquiry);

export { publicRouter as inquiryPublicRoutes, adminRouter as inquiryAdminRoutes };

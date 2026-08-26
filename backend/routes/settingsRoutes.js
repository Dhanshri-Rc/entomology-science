import express from "express";
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  resetSettings,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.get("/settings", getPublicSettings);

adminRouter.use(protect, requireAdmin);
adminRouter.get("/settings", getAdminSettings);
adminRouter.put("/settings", updateSettings);
adminRouter.post("/settings/reset", resetSettings);

export { publicRouter as settingsPublicRoutes, adminRouter as settingsAdminRoutes };

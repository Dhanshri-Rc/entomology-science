import jwt from "jsonwebtoken";
import env from "../config/env.js";
import Admin from "../models/Admin.js";
import { ApiError } from "../utils/asyncHandler.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Verifies the admin JWT, supplied either via an HTTP-only cookie
 * (preferred) or an Authorization: Bearer header (fallback for tooling).
 * Attaches the authenticated admin document to req.admin.
 */
export const protect = asyncHandler(async function protect(req, res, next) {
  let token = null;

  if (req.cookies && req.cookies[env.JWT_COOKIE_NAME]) {
    token = req.cookies[env.JWT_COOKIE_NAME];
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authenticated. Please log in.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Session expired or invalid. Please log in again.");
  }

  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new ApiError(401, "Account no longer exists.");
  }

  req.admin = admin;
  next();
});

export default protect;

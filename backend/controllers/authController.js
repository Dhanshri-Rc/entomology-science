import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import env, { isProduction } from "../config/env.js";
import asyncHandler, { ApiError } from "../utils/asyncHandler.js";

function signToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  };
}

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select(
    "+password"
  );

  if (!admin) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = signToken(admin);

  res.cookie(env.JWT_COOKIE_NAME, token, cookieOptions());

  res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    admin: admin.toSafeObject(),
  });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(env.JWT_COOKIE_NAME, { ...cookieOptions(), maxAge: 0 });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin.toSafeObject(),
  });
});

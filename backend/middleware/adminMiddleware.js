import { ApiError } from "../utils/asyncHandler.js";

/**
 * Ensures the authenticated user (attached by `protect`) has an
 * admin-level role. Use after `protect` on any admin-only route.
 */
export function requireAdmin(req, res, next) {
  if (!req.admin) {
    return next(new ApiError(401, "Not authenticated."));
  }

  if (!["admin", "superadmin"].includes(req.admin.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action."));
  }

  next();
}

export default requireAdmin;

import SiteSettings from "../models/SiteSettings.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/settings (public)
export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();

  res.status(200).json({
    success: true,
    data: settings,
  });
});

// GET /api/admin/settings
export const getAdminSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();

  res.status(200).json({
    success: true,
    data: settings,
  });
});

// PUT /api/admin/settings
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();

  const editableFields = [
    "organizationName",
    "email",
    "phone",
    "website",
    "addressShort",
    "addressFull",
    "facebook",
    "instagram",
    "x",
  ];

  editableFields.forEach((field) => {
    if (typeof req.body[field] === "string") {
      settings[field] = req.body[field].trim();
    }
  });

  await settings.save();

  res.status(200).json({
    success: true,
    message: "Site settings updated successfully.",
    data: settings,
  });
});

// POST /api/admin/settings/reset
// Safe alternative to deletion - restores documented defaults.
export const resetSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.getSingleton();

  settings.organizationName = "Entomology Science Association";
  settings.email = "contact@entomologyscience.org";
  settings.phone = "+91 81098 09909";
  settings.website = "https://www.entomologyscience.org/";
  settings.addressShort = "New Delhi, Delhi, 110015";
  settings.addressFull = "New Delhi, Delhi, 110015";
  settings.facebook = "https://www.facebook.com/EntomologyScienceAssoc/";
  settings.instagram = "https://www.instagram.com/entomology_science_association/";
  settings.x = "https://x.com/EntoSciAssoc";

  await settings.save();

  res.status(200).json({
    success: true,
    message: "Site settings reset to defaults.",
    data: settings,
  });
});

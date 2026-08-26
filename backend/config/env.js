import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "JWT_SECRET"];

const missing = required.filter((key) => !process.env[key]);

if (missing.length && process.env.NODE_ENV !== "test") {
  console.warn(
    `[env] Warning: missing recommended environment variables: ${missing.join(
      ", "
    )}. Using development fallbacks where possible.`
  );
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 5000,

  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/entomology",

  JWT_SECRET: process.env.JWT_SECRET || "dev-only-insecure-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME || "entomo_admin_token",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  ADMIN_NAME: process.env.ADMIN_NAME || "Administrator",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@entomologyscience.org",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "ChangeThisPassword123!",

  MANUSCRIPT_MAX_SIZE_MB: parseInt(process.env.MANUSCRIPT_MAX_SIZE_MB, 10) || 10,
  COVER_LETTER_MAX_SIZE_MB: parseInt(process.env.COVER_LETTER_MAX_SIZE_MB, 10) || 5,
};

export const allowedOrigins = env.CLIENT_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const isProduction = env.NODE_ENV === "production";

export default env;

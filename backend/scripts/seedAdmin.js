import "dotenv/config";
import mongoose from "mongoose";
import env from "../config/env.js";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

async function seedAdmin() {
  await connectDB();

  const existing = await Admin.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    console.log(
      `[seed] Admin with email ${env.ADMIN_EMAIL} already exists. Skipping creation.`
    );
    await mongoose.disconnect();
    process.exit(0);
  }

  const admin = await Admin.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL.toLowerCase(),
    password: env.ADMIN_PASSWORD,
    role: "superadmin",
  });

  console.log("[seed] Initial admin account created successfully:");
  console.log(`        Name:  ${admin.name}`);
  console.log(`        Email: ${admin.email}`);
  console.log(
    "        Password: (the value of ADMIN_PASSWORD in your .env file)"
  );
  console.log(
    "\n[seed] IMPORTANT: Log in and change this password as soon as possible."
  );

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("[seed] Failed to seed admin:", error);
  process.exit(1);
});

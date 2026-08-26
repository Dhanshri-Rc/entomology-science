import mongoose from "mongoose";
import env from "./env.js";

let isConnected = false;

/**
 * Connect to MongoDB using Mongoose.
 * Safe to call multiple times - will not create duplicate connections.
 */
export async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  const uri = env.MONGODB_URI;

  if (!uri) {
    console.error(
      "[db] MONGODB_URI is not defined. Please set it in your .env file."
    );
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });

    isConnected = true;

    console.log(
      `[db] MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`
    );
  } catch (error) {
    console.error("[db] MongoDB connection error:", error.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("[db] MongoDB runtime error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected.");
    isConnected = false;
  });

  return mongoose.connection;
}

/**
 * Gracefully close the MongoDB connection.
 */
export async function disconnectDB() {
  if (!isConnected) return;

  await mongoose.connection.close();
  isConnected = false;
  console.log("[db] MongoDB connection closed.");
}

export default connectDB;

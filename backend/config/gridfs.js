import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket = null;

/**
 * Returns a singleton GridFSBucket instance used to store manuscript
 * and cover-letter files directly inside MongoDB. This ensures uploaded
 * files survive server restarts/redeployments since they live in the
 * database itself rather than on local disk.
 */
export function getGridFSBucket() {
  if (bucket) return bucket;

  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "MongoDB connection is not ready. Cannot access GridFS bucket yet."
    );
  }

  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "submissionFiles",
  });

  return bucket;
}

export default getGridFSBucket;

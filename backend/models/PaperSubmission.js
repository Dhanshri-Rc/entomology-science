import mongoose from "mongoose";

const FileMetaSchema = new mongoose.Schema(
  {
    gridFsId: { type: mongoose.Schema.Types.ObjectId, default: null },
    originalName: { type: String, default: null },
    mimeType: { type: String, default: null },
    size: { type: Number, default: null },
  },
  { _id: false }
);

const PaperSubmissionSchema = new mongoose.Schema(
  {
    submissionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Author information
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    affiliation: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },

    // Corresponding author
    correspondingAuthor: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, trim: true, default: "" },
      address: { type: String, trim: true, default: "" },
    },

    // Paper information
    paperTitle: { type: String, required: true, trim: true, index: true },
    researchArea: { type: String, required: true, trim: true },
    abstract: { type: String, required: true },
    keywords: { type: String, required: true, trim: true },
    presentationType: { type: String, required: true, trim: true },

    // Uploaded files (stored in GridFS)
    manuscriptFile: { type: FileMetaSchema, default: () => ({}) },
    coverLetterFile: { type: FileMetaSchema, default: () => ({}) },

    notes: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: [
        "new",
        "under_review",
        "accepted",
        "revision_required",
        "rejected",
        "published",
      ],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

PaperSubmissionSchema.index({ createdAt: -1 });
PaperSubmissionSchema.index({
  fullName: "text",
  paperTitle: "text",
  email: "text",
  submissionId: "text",
});

export default mongoose.model("PaperSubmission", PaperSubmissionSchema);

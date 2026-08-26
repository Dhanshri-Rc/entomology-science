import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      default: "Entomology Science Association",
      trim: true,
    },
    email: {
      type: String,
      default: "contact@entomologyscience.org",
      trim: true,
    },
    phone: {
      type: String,
      default: "+91 81098 09909",
      trim: true,
    },
    website: {
      type: String,
      default: "https://www.entomologyscience.org/",
      trim: true,
    },
    addressShort: {
      type: String,
      default: "New Delhi, Delhi, 110015",
      trim: true,
    },
    addressFull: {
      type: String,
      default: "New Delhi, Delhi, 110015",
      trim: true,
    },
    facebook: {
      type: String,
      default: "https://www.facebook.com/EntomologyScienceAssoc/",
      trim: true,
    },
    instagram: {
      type: String,
      default: "https://www.instagram.com/entomology_science_association/",
      trim: true,
    },
    x: {
      type: String,
      default: "https://x.com/EntoSciAssoc",
      trim: true,
    },
  },
  { timestamps: true }
);

/**
 * There should only ever be a single SiteSettings document.
 * This helper fetches it, creating it with defaults if it doesn't exist yet.
 */
SiteSettingsSchema.statics.getSingleton = async function getSingleton() {
  let settings = await this.findOne();

  if (!settings) {
    settings = await this.create({});
  }

  return settings;
};

export default mongoose.model("SiteSettings", SiteSettingsSchema);

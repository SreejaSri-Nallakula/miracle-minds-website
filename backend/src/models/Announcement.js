import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetRoles: {
      type: [String],
      enum: ["admin", "teacher", "student"],
      default: ["teacher", "student"],
    },
  },
  { timestamps: true },
);

export const Announcement = mongoose.model("Announcement", announcementSchema);

import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true },
);

export const Subject = mongoose.model("Subject", subjectSchema);

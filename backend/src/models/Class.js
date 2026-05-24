import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    section: { type: String, trim: true, default: "A" },
    academicYear: { type: String, required: true, trim: true },
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true },
);

export const ClassModel = mongoose.model("Class", classSchema);

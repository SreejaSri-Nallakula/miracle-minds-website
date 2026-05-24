import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    admissionNumber: { type: String, required: true, unique: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    parentName: { type: String, trim: true },
    parentPhone: { type: String, trim: true },
    dateOfBirth: { type: Date },
  },
  { timestamps: true },
);

export const Student = mongoose.model("Student", studentSchema);

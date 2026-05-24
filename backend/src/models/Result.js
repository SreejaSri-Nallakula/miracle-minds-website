import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    examName: { type: String, required: true, trim: true },
    marksObtained: { type: Number, required: true, min: 0 },
    maxMarks: { type: Number, required: true, min: 1 },
    gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    remarks: { type: String, trim: true },
  },
  { timestamps: true },
);

resultSchema.index({ studentId: 1, subjectId: 1, examName: 1 }, { unique: true });

export const Result = mongoose.model("Result", resultSchema);

import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    qualification: { type: String, trim: true },
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    assignedSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true },
);

export const Teacher = mongoose.model("Teacher", teacherSchema);

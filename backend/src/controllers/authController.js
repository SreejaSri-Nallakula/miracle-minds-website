import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

function signToken(userId, role) {
  return jwt.sign({ id: userId, role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, "Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.isActive) {
    return errorResponse(res, "Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return errorResponse(res, "Invalid credentials", 401);
  }

  const token = signToken(user._id, user.role);
  return successResponse(
    res,
    {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    },
    "Login successful",
  );
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  let profile = null;
  if (user.role === "student") {
    profile = await Student.findOne({ userId: user._id }).populate("classId", "name section academicYear");
  }
  if (user.role === "teacher") {
    profile = await Teacher.findOne({ userId: user._id })
      .populate("assignedClasses", "name section academicYear")
      .populate("assignedSubjects", "name code");
  }

  return successResponse(res, { user, profile }, "Profile fetched");
});

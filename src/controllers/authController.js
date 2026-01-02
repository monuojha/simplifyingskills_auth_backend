import mongoose from "mongoose";
import User from "../models/User.js";



const register = async (req, res) => {
  console.log("req.body:", req.body);

  const {
    studentname,
    class: userClass,
    school,
    address,
    mobile,
    email,
    password,
    gender,
  } = req.body;

  try {
    // Required fields check
    if (!studentname || !school || !address || !mobile || !email || !password) {
      return res.status(400).json({
        message: "Student name, school, address, mobile, email and password are required",
      });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Mobile number already registered",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user (password will be hashed automatically by pre-save hook)
    const savedUser = await User.create({
      studentname,
      class: userClass,
      school,
      address,
      mobile,
      email,
      gender,
      password,           // plain password – hook will hash it
      otp,
      otpExpiresAt,
    });

    console.log("User saved successfully:", savedUser);
    console.log("OTP (testing only):", otp); // Production mein remove kar dena

    res.status(201).json({
      message: "Registration successful! OTP generated.",
      userId: savedUser._id,
      email: savedUser.email,
      mobile: savedUser.mobile,
      otp: otp, // Sirf testing ke liye – production mein hata dena
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

export { register };






  
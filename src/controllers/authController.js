import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 
const generateAccessToken = (id) => { 
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { 
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m', 
  }); 
}; 
 

// generateRefreshToken
const generateRefreshToken = (id) => { 
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { 
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '1d', 
  }); 
};




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
      
     // Sirf testing ke liye – production mein hata dena
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// otp-verify

const verifyOTP = async (req, res) => {
 
const { email, otp } = req.body;

try {
  if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }


  const user = await User.findOne({
    email,

  });

  // Check if user exists and OTP matches and is not expired
  if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

 

  // Mark user as verified
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    message: "OTP verified successfully",
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      studentname: user.studentname,
      class: user.class,
      school: user.school,
      address: user.address,
      mobile: user.mobile,
      email: user.email,
      gender: user.gender,
    },
  });
} catch (error) {
  console.error("OTP Verification error:", error);
  res.status(500).json({
    message: "Server error during OTP verification",
    error: error.message,
  });
  
}
 

  
};


// login, refresh token, 

const login = async (req, res) => {


  // Implementation here


  const { email, password } = req.body;
  try {

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        studentname: user.studentname,
        class: user.class,
        school: user.school,
        address: user.address,
        mobile: user.mobile,
        email: user.email,
        gender: user.gender,
      },
    });
      
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }


}

const logout = async (req, res) => {
  // Implementation here

  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decoded.id;

    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Server error during logout",
      error: error.message,
    });
  }
}
export { register, verifyOTP, login,  logout};

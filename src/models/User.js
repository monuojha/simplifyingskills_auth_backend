import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student Name is required"],
      trim: true,
    },
    class: {
      type: String,
      
    },
    school: {
      type: String,
      required: [true, "School is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,

            },
   
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,

    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);




const User = mongoose.model("User", userSchema);

export default User;
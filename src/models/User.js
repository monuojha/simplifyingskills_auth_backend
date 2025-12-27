import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    studentName: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
   
    enum: {
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Other'],
      message: 'Please select a valid class (1-12 or Other)'
    }
  },
  school: {
    type: String,
 
  },
  address: {
    type: String,

  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true, // Prevents duplicate mobile numbers

  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate emails
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
  
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
   isVerified: { type: Boolean, default: false }, 
  otp: { type: String }, 
  otpExpiresAt: { type: Date },
  refreshToken: { type: String }, 


}
,

{
  timestamps: true
}


);

const User = mongoose.model('User', userSchema);

export default User;


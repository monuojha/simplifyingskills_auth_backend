import mongoose from 'mongoose'; 

 
const connectDB = async () => { 
  try {

    mongoose.connect("mongodb://localhost:27017/auth_database")
    console.log('Database connected successfully');
  } catch (error) {
    
    console.error('Database connection error:', error);
    process.exit(1);
  }
}; 
 
export default connectDB; 

 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

dotenv.config( );
 
console.log( "env", process.env.DATABASE_URL);
const connectDB = async () => { 
  try {

    mongoose.connect(process.env.DATABASE_URL)
    console.log('Database connected successfully');
  } catch (error) {
    
    console.error('Database connection error:', error);
    process.exit(1);
  }
}; 
 
export default connectDB; 

 
import express from 'express';
import dotenv from 'dotenv';
const app = express();



import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
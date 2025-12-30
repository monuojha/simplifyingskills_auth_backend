import express from 'express';
const app = express();
const PORT = 3000;

import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
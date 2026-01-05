import express from 'express'; 
import { register, verifyOTP, login, logout, forgotPassword, newPassword , getProfile, updateProfile} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/new-password', newPassword);
router.get('/profile', authenticateToken, getProfile);
router.put('/update-profile',  authenticateToken, updateProfile);



export default router; 
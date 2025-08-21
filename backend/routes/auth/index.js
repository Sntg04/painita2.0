// routes/auth/index.js
import express from 'express';
import { requestOtp } from '../../controllers/authController.js';
import { verifyOtp } from '../../controllers/authController.js';

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

export default router;

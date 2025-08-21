// routes/auth/setPassword.js
import express from 'express';
import { setPassword } from '../../controllers/authController.js';

const router = express.Router();
router.post('/', setPassword);

export default router;

// routes/register/step5.js
import express from 'express';
import { saveBankInfo } from '../../controllers/registerController.js';
const router = express.Router();

router.post('/step5', saveBankInfo);

export default router;

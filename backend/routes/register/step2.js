// routes/register/step2.js
import express from 'express';
import { saveStep2 } from '../../controllers/registerController.js';
const router = express.Router();

router.post('/step2', saveStep2);

export default router;

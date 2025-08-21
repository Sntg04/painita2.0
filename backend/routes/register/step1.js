// routes/register/step1.js
import express from 'express';
import { saveStep1 } from '../../controllers/registerController.js';
const router = express.Router();

router.post('/step1', saveStep1);

export default router;

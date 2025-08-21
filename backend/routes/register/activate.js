// routes/register/activate.js
import express from 'express';
import { activateUser } from '../../controllers/registerController.js';
const router = express.Router();

router.post('/activate', activateUser);

export default router;

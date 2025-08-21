// routes/register/uploadSelfie.js
import express from 'express';
import { upload } from '../../utils/uploadFile.js';
import { saveSelfie } from '../../controllers/registerController.js';

const router = express.Router();

router.post('/upload-selfie', upload.single('selfie'), saveSelfie);

export default router;

// routes/register/uploadDocs.js
import express from 'express';
import { upload } from '../../utils/uploadFile.js';
import { saveDocumentFiles } from '../../controllers/registerController.js';

const router = express.Router();

router.post('/upload-docs', upload.fields([
  { name: 'id_front', maxCount: 1 },
  { name: 'id_back', maxCount: 1 }
]), saveDocumentFiles);

export default router;

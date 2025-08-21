// routes/register/references.js
import express from 'express';
import { saveReferences } from '../../controllers/registerController.js';
const router = express.Router();

router.post('/references', saveReferences);

export default router;

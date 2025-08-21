// utils/uploadFile.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/', // Puedes cambiar esto por integración con Cloudinary/S3
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Formato no permitido'));
  }
});

// utils/uploadToCloudinary.js
import { cloudinary } from './cloudinary.js';

export async function uploadToCloudinary(filePath, folder = 'painita_docs') {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [{ width: 800, height: 800, crop: 'limit' }]
    });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
}

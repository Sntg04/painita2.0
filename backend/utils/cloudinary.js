// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'drlpfgsih',
  api_key: '258841534316132',
  api_secret: process.env.CLOUDINARY_SECRET // ¡Nunca lo pongas en código!
});

export { cloudinary };

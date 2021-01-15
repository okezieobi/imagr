import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import { config } from 'dotenv';

config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: 'imagr-app',
  },
});

export default {
  image: multer({
    storage,
    fileFilter: (req, file, callback) => {
      const fileExt = path.extname(file.originalname);
      if (fileExt === '.png' || fileExt === '.jpeg' || fileExt === '.jpg' || fileExt === '.gif' || fileExt === '.bmp') {
        callback(null, true);
      } else {
        callback({ message: 'Only images are allowed', status: 400 });
      }
    },
  }),
};

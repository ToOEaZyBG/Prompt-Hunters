import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';

const router = express.Router();

// Добавяме logging middleware
router.use((req, res, next) => {
  console.log('Auth route accessed:', req.method, req.url);
  console.log('Request body:', req.body);
  next();
});

router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty(),
    body('lastName').notEmpty()
  ],
  authController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

router.post('/change-password',
  authMiddleware,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
  ],
  authController.changePassword
);

// Конфигурация за multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/avatars');
    // Създаваме директорията ако не съществува
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.user?.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB лимит
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// Добавяме logging middleware за multer
const uploadMiddleware = upload.single('avatar');

router.post('/avatar',
  authMiddleware,
  (req, res, next) => {
    console.log('Processing avatar upload request');
    console.log('Request headers:', req.headers);
    
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      } else if (err) {
        console.error('Other upload error:', err);
        return res.status(400).json({ message: err.message });
      }
      
      console.log('File received:', req.file);
      if (!req.file) {
        console.error('No file in request');
        return res.status(400).json({ message: 'No file uploaded' });
      }
      next();
    });
  },
  authController.uploadAvatar
);

router.delete('/avatar',
  authMiddleware,
  authController.deleteAvatar
);

export default router; 
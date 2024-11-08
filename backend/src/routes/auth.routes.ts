import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import formidable = require('formidable');
import path from 'path';
import fs from 'fs-extra';

// Разширяваме Request типа с Partial<user> за да позволим undefined
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const router = express.Router();

// Auth routes...
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty()
], authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], authController.login);

router.post('/change-password', authMiddleware, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
], authController.changePassword);

// Upload avatar route
router.post('/avatar', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const uploadDir = path.join(__dirname, '../../uploads/avatars');
  fs.ensureDirSync(uploadDir);

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: ({ mimetype }: { mimetype: string | null }) => {
      return !!(mimetype && mimetype.includes('image'));
    }
  });

  try {
    const [fields, files] = await form.parse(req);
    const file = files.avatar?.[0];
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Rename file to include user id
    const newPath = path.join(uploadDir, `${req.user.id}-${path.basename(file.filepath)}`);
    await fs.move(file.filepath, newPath, { overwrite: true });

    // Update user avatar in database
    await authController.updateAvatar(req.user.id.toString(), newPath);

    res.json({ 
      message: 'Avatar uploaded successfully',
      path: newPath
    });

  } catch (err) {
    next(err); // Използваме express error handling
  }
});

export default router; 
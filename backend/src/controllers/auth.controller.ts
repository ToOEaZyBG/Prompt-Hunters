import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../config/database';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs-extra';
import { User } from '../types/user';

interface UserAvatar {
  avatar_path?: string;
}

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const db = await getDatabase();

    // Проверка дали имейлът вече съществува
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Хеширане на паролата
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Създаване на потребител
    const stmt = db.prepare(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(email, hashedPassword, firstName, lastName);

    // Създаване на JWT token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: result.lastInsertRowid,
        email,
        firstName,
        lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const db = await getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    
    console.log('Login attempt processed');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error) {
    console.error('Login error occurred');
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user?.id;

  try {
    const db = await getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Проверка на текущата парола
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Хеширане на новата парола
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Обновяване на паролата
    const stmt = db.prepare(
      'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run(hashedPassword, userId);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const form = formidable({
      uploadDir: path.join(__dirname, '../../uploads/avatars'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }: { mimetype: string | null }) => {
        return !!(mimetype && mimetype.includes('image'));
      }
    });

    const [fields, files] = await form.parse(req);
    const file = files.avatar?.[0];
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarUrl = `/uploads/avatars/${path.basename(file.filepath)}`;
    const avatarPath = path.basename(file.filepath);

    // Обновяваме базата данни
    const db = await getDatabase();
    const stmt = db.prepare(
      'UPDATE users SET avatar_url = ?, avatar_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run(avatarUrl, avatarPath, req.user?.id);

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatarUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading avatar' });
  }
};

export const deleteAvatar = async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const stmt = db.prepare('SELECT avatar_path FROM users WHERE id = ?');
    const user = stmt.get(req.user?.id) as UserAvatar | undefined;

    if (user?.avatar_path) {
      const filePath = path.join(__dirname, '../../uploads/avatars', user.avatar_path);
      await fs.remove(filePath);
    }

    const updateStmt = db.prepare(
      'UPDATE users SET avatar_url = NULL, avatar_path = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    updateStmt.run(req.user?.id);

    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    console.error('Delete avatar error:', error);
    res.status(500).json({ message: 'Error deleting avatar' });
  }
};

export const updateAvatar = async (userId: string, avatarPath: string) => {
  const db = await getDatabase();
  const stmt = db.prepare('UPDATE users SET avatar_path = ? WHERE id = ?');
  stmt.run(avatarPath, userId);
};
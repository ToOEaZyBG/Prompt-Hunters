import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../config/database';
import path from 'path';
import fs from 'fs';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Register request received:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;
    const db = await getDatabase();

    // Проверка дали имейлът вече съществува
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Хеширане на паролата
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Creating new user...');

    // Създаване на потребител
    const result = await db.run(
      'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, firstName, lastName]
    );

    console.log('User created successfully:', result);

    const user = {
      id: result.lastID,
      email,
      firstName,
      lastName
    };

    // Генериране на JWT токен
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    );

    console.log('Registration successful for:', email);

    res.status(201).json({
      token,
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login attempt with:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const db = await getDatabase();

    // Намиране на потребителя
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Found user in database:', user);
    
    if (!user) {
      console.log('User not found in database');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Проверка на паролата
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Генериране на JWT токен
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    );

    console.log('Generated token:', token);
    console.log('Login successful for:', email);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id; // Ще добавим middleware за извличане на потребителя от токена

    const db = await getDatabase();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Проверка на текущата парола
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Хеширане на новата парола
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Обновяване на паролата
    await db.run(
      'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [hashedPassword, userId]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error during password change' });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    console.log('Upload avatar request:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const db = await getDatabase();
    
    // Генерираме публичен URL за аватара (без baseUrl)
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const avatarPath = req.file.filename;
    
    console.log('Avatar URL:', avatarUrl);
    console.log('Avatar path:', avatarPath);
    
    await db.run(
      'UPDATE users SET avatar_url = ?, avatar_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [avatarUrl, avatarPath, req.user?.id]
    );

    const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', [req.user?.id]);
    console.log('Updated user:', updatedUser);

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatar: {
        url: avatarUrl,
        path: avatarPath
      }
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ message: 'Server error during avatar upload' });
  }
};

export const deleteAvatar = async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const user = await db.get('SELECT avatar_path FROM users WHERE id = ?', [req.user?.id]);

    if (user?.avatar_path) {
      // Изтриваме файла
      const filePath = path.join(__dirname, '../../uploads/avatars', user.avatar_path);
      fs.unlinkSync(filePath);
    }

    await db.run(
      'UPDATE users SET avatar_url = NULL, avatar_path = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [req.user?.id]
    );

    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    console.error('Avatar delete error:', error);
    res.status(500).json({ message: 'Server error during avatar deletion' });
  }
}; 
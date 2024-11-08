import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../config/database';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Auth headers:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Verifying token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: number };
    console.log('Decoded token:', decoded);

    const db = await getDatabase();
    const user = await db.get('SELECT id, email, firstName, lastName FROM users WHERE id = ?', [decoded.id]);
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found for token');
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 
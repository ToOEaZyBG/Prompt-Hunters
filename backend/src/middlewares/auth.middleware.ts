import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../config/database';

// Дефинираме интерфейс за User от базата данни
interface DBUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  avatar_url?: string;
  avatar_path?: string;
  created_at: string;
  updated_at: string;
}

// Разширяваме типа Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Вземаме token от header-а
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Декодираме token-а
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload;
    
    // Проверяваме дали потребителят съществува в базата
    const db = await getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id) as DBUser | undefined;
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Добавяме user към request обекта
    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

// Функция за инициализация на базата данни
export async function initializeDatabase() {
  try {
    // Уверяваме се, че директорията съществува
    const dbDir = './database';
    if (!fs.existsSync(dbDir)){
      fs.mkdirSync(dbDir);
    }

    const db = await open({
      filename: './database/prompthunters.sqlite',
      driver: sqlite3.Database
    });

    console.log('Successfully connected to database');

    // Създаване на таблици с правилен тип за avatar
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        avatar_url TEXT DEFAULT NULL,
        avatar_path TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Проверка дали таблицата е създадена
    const tableCheck = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    console.log('Users table exists:', !!tableCheck);

    // Проверка на структурата на таблицата
    const tableInfo = await db.all("PRAGMA table_info(users)");
    console.log('Table structure:', tableInfo);

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Експортиране на singleton инстанция
let database: any = null;

export async function getDatabase() {
  if (!database) {
    database = await initializeDatabase();
  }
  return database;
} 
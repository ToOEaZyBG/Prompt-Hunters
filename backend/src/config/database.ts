import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export async function getDatabase() {
  if (db) {
    return db;
  }

  const dbPath = path.join(__dirname, '../../database/database.sqlite');
  console.log('Opening database at:', dbPath);

  db = new Database(dbPath, { verbose: console.log });

  // Създаваме таблиците ако не съществуват
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      avatar_url TEXT,
      avatar_path TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
} 
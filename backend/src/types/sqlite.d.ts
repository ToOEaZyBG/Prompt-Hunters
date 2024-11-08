declare module 'sqlite' {
  import { Database as SQLite3Database } from 'sqlite3';
  
  export interface Database extends SQLite3Database {
    open(): Promise<Database>;
    close(): Promise<void>;
    get<T = any>(sql: string, params?: any[]): Promise<T>;
    all<T = any>(sql: string, params?: any[]): Promise<T[]>;
    run(sql: string, params?: any[]): Promise<RunResult>;
    exec(sql: string): Promise<void>;
  }

  export interface RunResult {
    lastID: number;
    changes: number;
  }

  export function open(config: {
    filename: string;
    driver: any;
  }): Promise<Database>;
} 
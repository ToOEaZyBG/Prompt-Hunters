export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  avatar_path?: string;
  created_at: string;
  updated_at: string;
  role: string;
} 
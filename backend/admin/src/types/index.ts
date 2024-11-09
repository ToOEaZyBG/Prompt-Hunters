// User типове
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'super_admin' | 'admin' | 'user';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserActivity {
  id: number;
  user_id: number;
  action: string;
  details: string;
  created_at: string;
}

// Prompt типове
export interface Prompt {
  id: number;
  title: string;
  content: string;
  category: string;
  model: string;
  output?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

// Dashboard типове
export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalPrompts: number;
  activeUsers: number;
  promptsPerCategory: Record<string, number>;
  recentActivity: UserActivity[];
}

// Добавяме тип за единичен статистически запис
export interface StatsRecord {
  id: number;
  stats: DashboardStats;
} 
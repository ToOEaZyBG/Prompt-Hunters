import { getDatabase } from '../../config/database';
import bcrypt from 'bcryptjs';

interface TableColumn {
    cid: number;
    name: string;
    type: string;
    notnull: number;
    dflt_value: string | null;
    pk: number;
}

async function createSuperAdmin() {
    console.log('Starting super admin creation...');
    
    try {
        const db = await getDatabase();
        
        // Проверяваме дали колоната role съществува
        const columns = db.prepare("PRAGMA table_info('users')").all() as TableColumn[];
        const hasRoleColumn = columns.some(col => col.name === 'role');
        
        // Добавяме role колона само ако не съществува
        if (!hasRoleColumn) {
            console.log('Adding role column...');
            db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`);
        }
        
        // Хешираме паролата
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('TooEaZy123!', salt);
        
        // Създаваме супер админ акаунт
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO users (
                email, 
                password, 
                first_name, 
                last_name, 
                role
            ) VALUES (?, ?, ?, ?, ?);
        `);
        
        stmt.run(
            'tooeazy@prompthunters.com',
            hashedPassword,
            'TooEaZy',
            'Admin',
            'super_admin'
        );
        
        console.log('Super admin created successfully!');
        
        // Проверяваме създадения акаунт
        const admin = db.prepare('SELECT id, email, first_name, last_name, role FROM users WHERE role = ?').get('super_admin');
        console.log('Super admin account:', admin);
        
    } catch (error) {
        console.error('Error creating super admin:', error);
    }
}

createSuperAdmin();
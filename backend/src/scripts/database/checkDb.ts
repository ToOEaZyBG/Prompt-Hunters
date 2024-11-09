import { getDatabase } from '../../config/database';

async function checkDatabase() {
    console.log('Starting database check...');
    
    try {
        console.log('Getting database connection...');
        const db = await getDatabase();
        console.log('Database connected successfully');
        
        console.log('\nChecking tables...');
        const tables = db.prepare(`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='users';
        `).all();
        console.log('Tables found:', tables);

        if (tables.length > 0) {
            console.log('\nChecking users...');
            const users = db.prepare('SELECT * FROM users').all();
            console.log('Users found:', users);

            console.log('\nChecking table structure...');
            const tableInfo = db.prepare("PRAGMA table_info('users')").all();
            console.log('Table structure:', tableInfo);
        } else {
            console.log('\nNo users table found!');
        }

    } catch (error) {
        console.error('Error checking database:', error);
    }
}

console.log('Script started');
checkDatabase();
console.log('Script finished'); 
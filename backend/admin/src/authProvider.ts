import { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        avatar?: string;
    };
}

const authProvider: AuthProvider = {
    login: ({ username, password }: { username: string; password: string }) => {
        const request = new Request(`${API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((auth: AuthResponse) => {
                if (auth.user.role !== 'super_admin') {
                    throw new Error('Unauthorized: Admin access required');
                }
                localStorage.setItem('auth', JSON.stringify(auth));
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const auth = localStorage.getItem('auth');
        if (!auth) return Promise.reject();
        const { user } = JSON.parse(auth) as AuthResponse;
        return Promise.resolve(user.role);
    },
    getIdentity: () => {
        const auth = localStorage.getItem('auth');
        if (!auth) return Promise.reject();
        const { user } = JSON.parse(auth) as AuthResponse;
        return Promise.resolve({ 
            id: user.id, 
            fullName: `${user.first_name} ${user.last_name}`,
            avatar: user.avatar 
        });
    },
};

export default authProvider; 
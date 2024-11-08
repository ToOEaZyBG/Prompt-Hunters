import { AuthProvider } from 'react-admin';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        fullName: string;
        email: string;
        role: string;
        avatar?: string;
    };
}

const authProvider: AuthProvider = {
    login: ({ username, password }: { username: string; password: string }) => {
        const request = new Request('/api/auth/admin/login', {
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
            fullName: user.fullName,
            avatar: user.avatar 
        });
    },
};

export default authProvider; 
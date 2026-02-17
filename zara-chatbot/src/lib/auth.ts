
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://zara-ai-iphl.onrender.com/api';

export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('zara_token');
    }
    return null;
};

export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('zara_token', token);
    }
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('zara_token');
    }
};

export const setUser = (user: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('zara_user', JSON.stringify(user));
    }
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('zara_user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const logout = () => {
    removeAuthToken();
    if (typeof window !== 'undefined') {
        localStorage.removeItem('zara_user');
    }
};

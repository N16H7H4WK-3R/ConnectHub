import axios from 'axios';
import Cookies from 'js-cookie';

// access token from cookies
export const getAccessToken = () => {
    return Cookies.get('accessToken');
};

// access token in cookies
export const setAccessToken = (accessToken) => {
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
};

// refresh token from cookies
export const getRefreshToken = () => {
    return Cookies.get('refreshToken');
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken
        }, {
            withCredentials: true
        });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

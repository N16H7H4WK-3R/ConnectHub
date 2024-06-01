import axios from 'axios';
import { getAccessToken, refreshAccessToken } from './tokenUtils';

export const apiRequest = async (url, options = {}) => {
    try {
        const accessToken = getAccessToken();
        if (accessToken) {
            return await axios({
                url,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
                ...options
            });
        } else {
            const newAccessToken = await refreshAccessToken();
            return await axios({
                url,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`
                },
                withCredentials: true,
                ...options
            });
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const newAccessToken = await refreshAccessToken();
            return await axios({
                url,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`
                },
                withCredentials: true,
                ...options
            });
        } else {
            console.error('API request error:', error);
            throw error;
        }
    }
};

// API calls
export const fetchProfileData = async () => {
    return await apiRequest('http://127.0.0.1:8000/api/profile/');
};

export const fetchContactData = async () => {
    return await apiRequest('http://127.0.0.1:8000/api/contacts/');
};

export const fetchInteractionData = async () => {
    return await apiRequest('http://127.0.0.1:8000/api/interactions/');
};


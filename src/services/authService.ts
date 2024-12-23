import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';

const API_URL = 'http://localhost:8080/api';

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        try {
            console.log('Sending request to:', `${API_URL}/auth/login`);
            console.log('Request data:', data);
            
            const response = await axios.post(`${API_URL}/auth/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response:', response);
            
            if (response.data && response.data.token) {
                return response.data;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error: any) {
            console.error('Auth service error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }
};
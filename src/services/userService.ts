import axios from 'axios';
import { User } from '../types/auth';

const API_URL = 'http://localhost:8080/api';

export interface CreateUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export const userService = {
    createUser: async (userData: CreateUserRequest): Promise<User> => {
        const response = await axios.post(`${API_URL}/admin/users`, userData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },
}; 
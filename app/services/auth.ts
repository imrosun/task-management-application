// services/auth.ts
import axios from 'axios';
import {BASE_URL} from "./apiEndpoints";

interface LoginData {
    email: string;
    password: string;
}

interface SignupData {
    fullName: string;
    email: string;
    password: string;
}

interface LoginResponse {
    email: string;
    token: string;
    fullName: string;
}

interface SignupResponse {
    message: string;
    email: string;
    fullName: string;
    token: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, data);
        // const response = await axios.post('https://your-vercel-deployment-url.vercel.app/api/users/login', data);
        
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/users/signup`, data);
        return response.data;
    } catch (error) {
        throw new Error('Signup failed');
    }
};

export const validateToken = async (token: string): Promise<{ valid: boolean; fullName?: string }> => {
    return { valid: !!token, fullName: 'User FullName' };
};
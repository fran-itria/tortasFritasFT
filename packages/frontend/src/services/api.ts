import apiClient from '@/lib/axios';
import { OptionsResponse } from './types';

export const optionsServiceApi = {
    getAll: () => apiClient.get<OptionsResponse>('/options'),
};

export const usersServiceApi = {
    login: (email: string) => apiClient.put(`/users/login`, { email }),
    loginWithToken: () => apiClient.put('/users/loginWithToken'),
    createUser: ({ id, email, name, surname }: {
        id: string,
        email: string,
        name: string,
        surname: string
    }) => apiClient.post(`/users`, {
        id,
        email,
        name,
        surname,
        active: true
    })
}

export const productsServiceApi = {
    getAll: () => apiClient.get('/products'),
}
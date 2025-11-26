import apiClient from '@/lib/axios';
import { OptionsResponse } from './types';
import { Products } from 'hooks/useProductsHook';

export const optionsServiceApi = {
    getAll: () => apiClient.get<OptionsResponse>('/options'),
    update: (body: OptionsResponse | undefined) => apiClient.put('/admin/options', { ...body }),
};

export const usersServiceApi = {
    login: (id: string) => apiClient.put(`/users/login`, { id }),
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
    }),
    getAll: () => apiClient.get('/admin/users'),
    changeAdminStatus: ({ id, admin }: { id: string, admin: boolean }) => apiClient.put('/admin/users/changeAdminStatus', { id, admin }),
    changeActiveStatus: ({ id, active }: { id: string, active: boolean }) => apiClient.put('/admin/users/changeActiveStatus', { id, active }),
}

export const productsServiceApi = {
    getAll: () => apiClient.get('/products'),
    getOneProduct: (id: string) => apiClient.get(`/products/${id}`),
    create: (body: Products) => apiClient.post('admin/products', { ...body }),
    update: (body: Products) => apiClient.put('admin/products', { ...body }),
}

export const OrdersServiceApi = {
    getAll: () => apiClient.get('/admin/orders'),
    updateStatus: ({ orderId, state }: { orderId: string, state: string }) => apiClient.put('/admin/orders', { id: orderId, state }),
}
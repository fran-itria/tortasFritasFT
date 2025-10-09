import apiClient from '@/lib/axios';
import { OptionsResponse } from './types';

export const optionsServiceApi = {
    getAll: () => apiClient.get<OptionsResponse>('/options'),
};
import axios from 'axios';

// Crear una instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', // URL de tu backend
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para requests (opcional - para agregar tokens, etc.)
apiClient.interceptors.request.use(
    (config) => {
        // Agregar token de autenticación si existe
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para responses (opcional - manejo de errores global)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
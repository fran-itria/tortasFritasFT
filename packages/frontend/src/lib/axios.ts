import axios from 'axios';

// Interfaces y clases de error
export interface ApiErrorResponse {
    data: {
        error: string
        message: string
        statusCode: number
    }
}

export class ApiError extends Error {
    public name: string = 'ApiError'
    public response: ApiErrorResponse

    constructor(message: string, response: ApiErrorResponse) {
        super(message)
        this.response = response
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

// Crear una instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: false || 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para requests (opcional - para agregar tokens, etc.)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }

        if (error.response) {
            const apiError = new ApiError(
                error.response.data?.message || 'Error en la API',
                error.response
            );
            return Promise.reject(apiError);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
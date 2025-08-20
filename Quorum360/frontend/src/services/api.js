// api.js - Configuración base de Axios
import axios from 'axios';

// Configuración base de Axios
const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
    });

API.interceptors.request.use(
    (config) => {
        // Agregar tokens de autenticación aquí
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

// Interceptor para responses para manejar errores globalmente
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejo global de errores
        if (error.response?.status === 401) {
        // Token expirado o no autorizado
        localStorage.removeItem('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Servicios específicos para usuarios
export const userService = {
  
  
    // Registrar nuevo usuario
    register: async (userData) => {
        try {
        const response = await API.post('/users/register', userData);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Error en el registro' };
        }
    },

    // Login de usuario
    login: async (credentials) => {
        try {
        const response = await API.post('/users/login', credentials);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Error en el login' };
        }
    },

  // Obtener perfil de usuario
    getProfile: async () => {
        try {
        const response = await API.get('/users/profile');
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Error al obtener perfil' };
        }
    },

    // Actualizar perfil
    updateProfile: async (userData) => {
        try {
        const response = await API.put('/users/profile', userData);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Error al actualizar perfil' };
        }
    },

    // Eliminar usuario
    deleteUser: async (userId) => {
        try {
        const response = await API.delete(`/users/${userId}`);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Error al eliminar usuario' };
        }
    }
};

export default API;
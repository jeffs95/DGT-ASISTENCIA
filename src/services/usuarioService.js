import axiosInstance from '../axiosConfig';
import { reactLocalStorage } from 'reactjs-localstorage';

export const getAllUsuario = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/usuario', config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener usuario');
    }
};

export const getUsuarioById = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener usuario');
    }
};

export const setUsuario = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/usuario', params, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener usuario');
    }
};

export const updateUsuario = async (id, params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/usuario/${id}`, params, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener usuario');
    }
};

export const updateContraseña = async (id, password) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.patch(`/api/usuario/${id}/password`, {password}, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener usuario');
    }
};

export const inactivarUsuario = async (id) => {
    try {
        await axiosInstance.put(`/user/inactivar/${id}`)
    } catch (error) {
        console.log('[ERROR] >', error);
        
    }
};

export const activarUsuario = async (id) => {
    try {
        await axiosInstance.put(`/user/activar/${id}`)
    } catch (error) {
        console.log('[ERROR] >', error);
        
    }
};
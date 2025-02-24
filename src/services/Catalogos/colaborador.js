import axiosInstance from '../axiosConfig';
import { reactLocalStorage } from 'reactjs-localstorage';

export const getAllColaborador = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/colaborador', config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener colaboradores');
    }
};

export const setColaborador = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/colaborador', params, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener colaboradores');
    }
};

export const updateColaborador = async (id, params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/colaborador/${id}`, params, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener colaboradores');
    }
};

export const inactivarColaborador = async (id) => {
    try {
        await axiosInstance.put(`/colaborador/inactivar/${id}`)
    } catch (error) {
        console.log('[ERROR] >', error);
        
    }
};

export const activarColaborador = async (id) => {
    try {
        await axiosInstance.put(`/colaborador/activar/${id}`)
    } catch (error) {
        console.log('[ERROR] >', error);
        
    }
};

export const EstadoColaborador = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.head(`/api/colaborador/${id}/edit`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../../axiosConfig';

export const getListaUnidad = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/unidad', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const crearUnidad = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/unidad', params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EditarUnidad = async (id, params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/unidad/${id}`, params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EliminarUnidad = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete(`/api/unidad/${id}`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const ObtenerIdUnidad = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/{id}/unidad', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
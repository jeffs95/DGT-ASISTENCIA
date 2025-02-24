import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../../axiosConfig';

export const getListaIngreso = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/ingreso', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const crearIngreso = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/ingreso', params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EditarIngreso = async (id, data) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/ingreso/${id}`, data, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EliminarIngreso = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/ingreso/${id}/deteled_at`, {}, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const ObtenerIdIngreso = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/{id}/ingreso', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
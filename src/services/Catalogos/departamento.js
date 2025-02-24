import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../../axiosConfig';

export const getListaDepartamento = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/departamento', config);        
        return response.data;
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const crearDepartamento = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        console.log('[DATA], ', params);
        
        const response = await axiosInstance.post('/api/departamento', params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EditarDepartamento = async (id, data) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/departamento/${id}`, data, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EliminarDepartamento = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/departamento/${id}/deteled_at`, {}, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const ObtenerIdDepartamento = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/{id}/departamento', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
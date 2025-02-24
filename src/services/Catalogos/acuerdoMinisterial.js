import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../../axiosConfig';

export const getListaAcuerdoMinisterial = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/acuerdo_ministerial', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const crearAcuerdoMinisterial = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/acuerdo_ministerial', params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EditarAcuerdoMinisterial = async (id, data) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/acuerdo_ministerial/${id}`, data, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EliminarAcuerdoMinisterial = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete(`/api/acuerdo_ministerial/${id}`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EstadoAcuerdoMinisterial = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.head(`/api/acuerdo_ministerial/${id}/edit`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const ObtenerIdAcuerdoMinisterial = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/{id}/acuerdo_ministerial', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../axiosConfig';

export const getListaAcuerdoGubernativo = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/acuerdo_gubernativo', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const crearAcuerdoGubernativo = async (params) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/acuerdo_gubernativo', params, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EditarAcuerdoGubernativo = async (id, data) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/acuerdo_gubernativo/${id}`, data, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EliminarAcuerdoGubernativo = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.delete(`/api/acuerdo_gubernativo/${id}`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const EstadoAcuerdoGubernativo = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.head(`/api/acuerdo_gubernativo/${id}/edit`, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};

export const ObtenerIdAcuerdoGubernativo = async (id) => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/{id}/acuerdo_gubernativo', config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
};
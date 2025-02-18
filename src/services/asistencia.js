import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../axiosConfig';

export const getAllAsistencia = async () => {
    try {
        const response = await axiosInstance.get('/asistencia/all');
        return response.data;
    } catch (error) {
        console.log('Error al obtener usuarios');
    }
};

export const crearListaAsistencia = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/asistencia', {}, config);
        return response.data;                    
    } catch (error) {
        console.log('[ERROR] >', error);
    }
}

export const getAsistenciaHoy = async () => {
    try {
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.get('/api/asistencia', config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al obtener las asistencias de hoy');
    }
};

export const updateAsistencia = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.put(`/api/asistencia/${id}`, {}, config);
        return response.data;
    } catch (error) {
        console.error('[ERROR] >', error.message);
        throw new Error('Error al actualizar las asistencias');
    }
};

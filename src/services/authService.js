import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from '../axiosConfig';

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/api/authenticate', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Credenciales inválidas');
    }
};

export const logout = async (id) => {
    try {        
        const storedData = reactLocalStorage.getObject('var');
        const accessToken = storedData.access_token;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axiosInstance.post('/api/logout', {id}, config);
        return response.data;
    } catch (error) {
        throw new Error('No se completo la operación');
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/user/register', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar usuario');
    }
};

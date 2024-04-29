import axios from 'axios';
import { Device } from '../interfaces/Device';
import { ResponseApi } from './types/response';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllDevices = async () => {
    const response = await axios.get<ResponseApi<Device[]>>(`${API_URL}/device`);
    return response.data;
}

export const getDeviceByImei = async (imei: string) => {
    const response = await axios.get<ResponseApi<Device>>(`${API_URL}/device/imei/${imei}`);
    return response.data;
}

export const getDevicesBySupplier = async (supplier: string) => {
    const response = await axios.get<ResponseApi<Device[]>>(`${API_URL}/device/supplier/${supplier}`);
    return response.data;
}
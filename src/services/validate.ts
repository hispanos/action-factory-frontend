import axios from 'axios';
import { ResponseApi } from './types/response';

const API_URL = import.meta.env.VITE_API_URL;

export const validateFile = async (file: File) => {
  const response = await axios.post<ResponseApi<boolean>>(
    `${API_URL}/validate`,
    file
  );
  return response.data;
};

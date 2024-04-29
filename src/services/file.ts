import axios from 'axios';
import { ResponseApi } from './types/response';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post<ResponseApi<string>>(
      `${API_URL}/file/upload-csv`,
      formData
    );
    return response.data;
  } catch (error) {
    return {
      data: null,
      status: false,
      error: {
        message: 'Error al cargar el archivo',
      },
    };
  }
};

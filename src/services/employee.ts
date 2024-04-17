import axios from 'axios';
import { ResponseApi } from './types/response';
import { Employee, FormEmployee } from '../interfaces/Employee';

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async () => {
  const response = await axios.get<ResponseApi<Employee[]>>(
    `${API_URL}/employee`
  );
  return response.data;
};

export const updateEmployee = async (id: number, data: FormEmployee) => {
  const response = await axios.put<ResponseApi<Employee>>(
    `${API_URL}/employee/${id}`,
    data
  );
  return response.data;
};

export const saveEmployees = async (data: FormEmployee) => {
  const response = await axios.post<ResponseApi<Employee>>(
    `${API_URL}/employee`,
    data
  );
  return response.data;
};

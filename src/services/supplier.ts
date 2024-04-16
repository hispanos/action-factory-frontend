import axios from 'axios';
import { FormSupplier, Supplier } from '../interfaces/Supplier';
import { ResponseApi } from './types/response';

const API_URL = import.meta.env.VITE_API_URL;

export const getSuppliers = async () => {
  const response = await axios.get<ResponseApi<Supplier[]>>(
    `${API_URL}/supplier`
  );
  return response.data;
};

export const saveSuppliers = async (supplier: FormSupplier) => {
  const response = await axios.post<ResponseApi<Supplier>>(
    `${API_URL}/supplier`,
    supplier
  );
  return response.data;
};

export const deleteSupplier = async (idSupploer: number) => {
  const response = await axios.delete<ResponseApi<boolean>>(
    `${API_URL}/supplier/${idSupploer}`
  );
  return response.data;
};

export const updateSupplier = async (
  idSupplier: number,
  supplier: FormSupplier
) => {
  const response = await axios.put<ResponseApi<Supplier>>(
    `${API_URL}/supplier/${idSupplier}`,
    supplier
  );
  return response.data;
};

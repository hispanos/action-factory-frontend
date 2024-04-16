import axios from 'axios';
import { FormSupplier, Supplier } from '../interfaces/Supplier';
import { ResponseApi } from './types/response';

const API_URL = import.meta.env.VITE_API_URL;

export const getSuppliers = async (): Promise<ResponseApi<Supplier[]>> => {
  const response = await axios.get(`${API_URL}/supplier`);
  const data: ResponseApi<Supplier[]> = response.data;
  return data;
};

export const saveSuppliers = async (
  supplier: FormSupplier
): Promise<ResponseApi<Supplier>> => {
  const response = await axios.post(`${API_URL}/supplier`, supplier);
  const data: ResponseApi<Supplier> = response.data;
  return data;
};

export const deleteSupplier = async (
  idSupploer: number
): Promise<ResponseApi<boolean>> => {
  const response = await axios.delete(`${API_URL}/supplier/${idSupploer}`);
  const data: ResponseApi<boolean> = response.data;
  return data;
};

export const updateSupplier = async (
  idSupplier: number,
  supplier: FormSupplier
): Promise<ResponseApi<Supplier>> => {
  const response = await axios.put(
    `${API_URL}/supplier/${idSupplier}`,
    supplier
  );
  const data: ResponseApi<Supplier> = response.data;
  return data;
};

import axios from 'axios';
import queryString from 'query-string';
import { VehicleInformationInterface, VehicleInformationGetQueryInterface } from 'interfaces/vehicle-information';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVehicleInformations = async (
  query?: VehicleInformationGetQueryInterface,
): Promise<PaginatedInterface<VehicleInformationInterface>> => {
  const response = await axios.get('/api/vehicle-informations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVehicleInformation = async (vehicleInformation: VehicleInformationInterface) => {
  const response = await axios.post('/api/vehicle-informations', vehicleInformation);
  return response.data;
};

export const updateVehicleInformationById = async (id: string, vehicleInformation: VehicleInformationInterface) => {
  const response = await axios.put(`/api/vehicle-informations/${id}`, vehicleInformation);
  return response.data;
};

export const getVehicleInformationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vehicle-informations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVehicleInformationById = async (id: string) => {
  const response = await axios.delete(`/api/vehicle-informations/${id}`);
  return response.data;
};

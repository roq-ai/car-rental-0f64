import axios from 'axios';
import queryString from 'query-string';
import { ReservationsInterface, ReservationsGetQueryInterface } from 'interfaces/reservations';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReservations = async (
  query?: ReservationsGetQueryInterface,
): Promise<PaginatedInterface<ReservationsInterface>> => {
  const response = await axios.get('/api/reservations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createReservations = async (reservations: ReservationsInterface) => {
  const response = await axios.post('/api/reservations', reservations);
  return response.data;
};

export const updateReservationsById = async (id: string, reservations: ReservationsInterface) => {
  const response = await axios.put(`/api/reservations/${id}`, reservations);
  return response.data;
};

export const getReservationsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/reservations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReservationsById = async (id: string) => {
  const response = await axios.delete(`/api/reservations/${id}`);
  return response.data;
};

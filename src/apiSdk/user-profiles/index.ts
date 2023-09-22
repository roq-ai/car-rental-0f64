import axios from 'axios';
import queryString from 'query-string';
import { UserProfilesInterface, UserProfilesGetQueryInterface } from 'interfaces/user-profiles';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUserProfiles = async (
  query?: UserProfilesGetQueryInterface,
): Promise<PaginatedInterface<UserProfilesInterface>> => {
  const response = await axios.get('/api/user-profiles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createUserProfiles = async (userProfiles: UserProfilesInterface) => {
  const response = await axios.post('/api/user-profiles', userProfiles);
  return response.data;
};

export const updateUserProfilesById = async (id: string, userProfiles: UserProfilesInterface) => {
  const response = await axios.put(`/api/user-profiles/${id}`, userProfiles);
  return response.data;
};

export const getUserProfilesById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserProfilesById = async (id: string) => {
  const response = await axios.delete(`/api/user-profiles/${id}`);
  return response.data;
};

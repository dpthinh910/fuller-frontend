import { axios } from 'src/lib/axios';
import { API } from 'src/lib/api-list';
import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
  return axios.get(API.getUserProfile, { withCredentials: true });
};

import { axios } from 'src/lib/axios';
import { API } from 'src/lib/api-list';
import { GetProfile } from '../types';

export const getUser = (): Promise<GetProfile> => {
  return axios.get(API.getUserProfile, { withCredentials: true });
};

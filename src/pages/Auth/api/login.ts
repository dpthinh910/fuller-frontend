import { axios } from 'src/lib/axios';
import { API } from 'src/lib/api-list';
import { UserResponse } from '../types';

export type UserLoginDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (payload: UserLoginDTO): Promise<UserResponse> => {
  return axios.post(API.login, payload);
};

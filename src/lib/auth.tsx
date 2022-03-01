import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from 'src/components/Elements/Spinner';
import { loginWithEmailAndPassword, getUser, UserResponse, UserLoginDTO, AuthUser } from 'src/pages/Auth';
import { storage } from 'src/utils/localStorage';

async function handleUserResponse(response: UserResponse) {
  const { user, token } = response;
  storage.setToken(token);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const { data } = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: UserLoginDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

async function registerFn() {
  return null;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <Spinner />;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<AuthUser | null, unknown, UserLoginDTO>(authConfig);

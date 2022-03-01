import { Navigate, useRoutes } from 'react-router-dom';

import { useAuth } from 'src/lib/auth';

import { ProtectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();
  const { user } = useAuth();

  const navigateURL = user && user.role === 'user' ? '/user' : user && user.role === 'admin' ? '/app' : '/auth/login';

  const commonRoutes = [{ path: '/', element: <Navigate to={navigateURL} /> }];

  const routes = auth.user ? ProtectedRoutes() : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

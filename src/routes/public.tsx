import { lazyImport } from 'src/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('src/pages/Auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];

import { lazyImport } from 'src/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('src/pages/Auth'), 'AuthRoutes');
const { NotFoundPage } = lazyImport(() => import('src/pages/404NotFound'), 'NotFoundPage');

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

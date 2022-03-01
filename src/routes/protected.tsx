import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Spinner } from 'src/components/Elements/Spinner';
import MainLayout from 'src/components/MainLayout';
import { lazyImport } from 'src/utils/lazyImport';

const { NotFoundPage } = lazyImport(() => import('src/pages/404NotFound'), 'NotFoundPage');

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      // { index: true, element: <Home /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

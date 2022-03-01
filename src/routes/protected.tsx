import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Spinner } from 'src/components/Elements/Spinner';
import MainLayout from 'src/components/MainLayout';
import { lazyImport } from 'src/utils/lazyImport';

const { NotFoundPage } = lazyImport(() => import('src/pages/404NotFound'), 'NotFoundPage');
const { BookingList } = lazyImport(() => import('src/pages/Booking/components/BookingList'), 'BookingList');
const { UserBooking } = lazyImport(() => import('src/pages/Booking/components/UserBooking'), 'UserBooking');

const MainAppLayout = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const ProtectedRoutes = () => {
  return [
    {
      path: '/app',
      element: <MainAppLayout />,
      children: [{ index: true, element: <BookingList /> }],
    },
    {
      path: `/user`,
      element: <MainAppLayout />,
      children: [{ index: true, element: <UserBooking /> }],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];
};

import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Spinner } from 'src/components/Elements/Spinner';
import MainLayout from 'src/components/MainLayout';
import { lazyImport } from 'src/utils/lazyImport';

const { NotFoundPage } = lazyImport(() => import('src/pages/404NotFound'), 'NotFoundPage');
const { BookingList } = lazyImport(() => import('src/pages/Booking/components/BookingList'), 'BookingList');
const { AdminBookingRoutes } = lazyImport(() => import('src/pages/Booking/'), 'AdminBookingRoutes');

const MainAppLayout = () => {
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
    element: <MainAppLayout />,
    children: [
      { index: true, element: <BookingList /> },
      { path: 'bookings/*', element: <AdminBookingRoutes /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

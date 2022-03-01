import { Navigate, Route, Routes } from 'react-router-dom';
import { lazyImport } from 'src/utils/lazyImport';

const { UserBooking } = lazyImport(() => import('../components/UserBooking'), 'UserBooking');
const { CreateBooking } = lazyImport(() => import('../components/CreateBooking'), 'CreateBooking');

export const AdminBookingRoutes = () => {
  return (
    <Routes>
      <Route index element={<UserBooking />} />
      <Route path="new" element={<CreateBooking />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

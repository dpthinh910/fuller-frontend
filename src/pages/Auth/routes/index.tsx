import { Route, Routes } from 'react-router-dom';
import { lazyImport } from 'src/utils/lazyImport';

const { Login } = lazyImport(() => import('./Login'), 'Login');

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

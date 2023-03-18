import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  GuestsRoute,
  PrivateAdminRoute,
  PrivateRouteNoGuests,
} from './routes/PrivateRoutes';
import { Suspense, lazy, useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { findById } from './generated/UserController';
import LoginUser from './generated/com/example/application/model/User/LoginUser';

const MainLayout = lazy(() => import('./views/MainLayout'));
const LandPageView = lazy(() => import('./views/LandPageView'));
const LoginPageView = lazy(() => import('./views/LoginPageView'));
const DashboardView = lazy(() => import('./views/DashboardView'));
const AdminPanelView = lazy(() => import('./views/AdminPanelView'));
const MainLoadingScreen = lazy(
  () => import('./components/loaders/MainLoadingScreen')
);
const ProfilesView = lazy(() => import('./views/ProfilesView'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<MainLoadingScreen />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        element: <GuestsRoute />,
        children: [
          {
            path: '/',
            element: <LandPageView />,
          },
          { path: '/login', element: <LoginPageView /> },
        ],
      },
      {
        element: <PrivateRouteNoGuests />,
        children: [
          { path: '/dashboard', element: <DashboardView /> },
          {
            path: '/profiles/:id',
            element: <ProfilesView />,
          },
        ],
      },
      {
        element: <PrivateAdminRoute />,
        children: [
          {
            path: '/admin',
            element: <AdminPanelView />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

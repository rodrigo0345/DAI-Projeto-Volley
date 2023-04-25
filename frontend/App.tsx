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
const ForumView = lazy(() => import('./views/ForumView'));
const NewPostView = lazy(() => import('./views/NewPostView'));
const PostView = lazy(() => import('./views/PostView'));
const TeamView = lazy(() => import('./views/TeamView'));
const NotFound = lazy(() => import('./views/404'));

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    element: (
      <Suspense fallback={<MainLoadingScreen />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        errorElement: <NotFound />,
      },
      {
        errorElement: <NotFound />,
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
        errorElement: <NotFound />,
        element: <PrivateRouteNoGuests />,
        children: [
          { path: '/dashboard', element: <DashboardView /> },
          {
            path: '/profiles/:id',
            element: <ProfilesView />,
          },
          { path: '/forum', element: <ForumView /> },
          { path: '/new-post', element: <NewPostView /> },
          { path: '/post/:type/:id', element: <PostView /> },
          { path: '/team', element: <TeamView /> },
        ],
      },
      {
        errorElement: <NotFound />,
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

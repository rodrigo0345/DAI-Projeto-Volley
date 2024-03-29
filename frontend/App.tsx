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
const PostView = lazy(() => import('./views/PostView'));
const TeamView = lazy(() => import('./views/TeamView'));
const NotFound = lazy(() => import('./views/404'));
const TrainingView = lazy(() => import('./views/PracticeView'));
const ReportView = lazy(() => import('./views/ReportView'));
const HealthView = lazy(() => import('./views/HealthView'));
const GameView = lazy(() => import('./views/GameView'));
const LivesView = lazy(() => import('./views/LivesView'));

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    element: (
      <Suspense>
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
          { path: '/forum', element: <ForumView /> },
          { path: '/post/:type/:id', element: <PostView /> },
          { path: '/team', element: <TeamView /> },
          { path: '/training', element: <TrainingView /> },
          { path: '/report', element: <ReportView /> },
          { path: '/health', element: <HealthView /> },
          { path: '/game', element: <GameView /> },
          { path: '/lives', element: <LivesView /> },
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

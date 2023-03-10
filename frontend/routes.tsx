import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, useContext } from 'react';
import {
  createBrowserRouter,
  IndexRouteObject,
  NonIndexRouteObject,
  useMatches,
} from 'react-router-dom';
import { AuthenticationController } from './generated/endpoints';
import { UserContext } from './contexts/UserContext';
import User from './generated/com/example/application/model/User/User';

const LandPageView = lazy(async () => import('Frontend/views/LandPageView.js'));
const LoginPageView = lazy(
  async () => import('Frontend/views/LoginPageView.js')
);
export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LandPageView />,
        loader: async () => {
          return <LoginPageView />;
        },
      },
      {
        path: '/login',
        element: <LoginPageView />,
        handle: { icon: 'la la-list-alt', title: 'Welcome 😁' },
      },
      {
        path: '/dashboard',
        element: <MainLayout />,
      },
    ],
  },
];

const router = createBrowserRouter([...routes]);
export default router;

import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy, useContext } from 'react';
import {
  createBrowserRouter,
  IndexRouteObject,
  NonIndexRouteObject,
  useMatches,
} from 'react-router-dom';
import LandPageView from './views/LandPageView';
import LoginPageView from './views/LoginPageView';
import { UserContext } from './contexts/userContext';
import AuthenticationRequest from './generated/com/example/application/controller/Auth/AuthenticationRequest';
import { AuthenticationController } from './generated/endpoints';
import AuthenticationRequestModel from './generated/com/example/application/controller/Auth/AuthenticationRequestModel';
import User from './generated/com/example/application/model/User/User';

const user = useContext(UserContext);

async function checkIfUserIsLogged(user: User) {
  const result = await AuthenticationController.authenticate({
    email: user?.email,
    password: user?.password,
  });

  return result?.body?.token && user;
}

export const routes = [
  {
    path: '/',
    element: <LandPageView />,
    loader: async () => {
      if (!user) return <LoginPageView />;
      if (await checkIfUserIsLogged(user)) {
        return <MainLayout />; // todo mudar isto
      }
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
];

const router = createBrowserRouter([...routes]);
export default router;

import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { Suspense, useContext, useEffect } from 'react';
import {
  NavLink,
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import css from './MainLayout.module.css';
import MainHeader from 'Frontend/components/headers/MainHeader';
import MainFooter from 'Frontend/components/footers/MainFooter';
import ThemeProvider from 'Frontend/contexts/themeContext';
import Context, { UserContext } from 'Frontend/contexts/UserContext';
import {
  PrivateAdminRoute,
  PrivateManagerRoute,
  PrivateRouteNoGuests,
  GuestsRoute,
} from 'Frontend/routes/PrivateRoutes';
import LoginPageView from './LoginPageView';
import LandPageView from './LandPageView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanelView from './AdminPanelView';
import DashboardView from './DashboardView';

export default function MainLayout() {
  return (
    <Context>
      <ThemeProvider>
        <AppLayout className='' primarySection='drawer'>
          <MainHeader></MainHeader>
          <Suspense fallback={<Placeholder />}>
            <Outlet />
          </Suspense>
          <MainFooter></MainFooter>
        </AppLayout>
      </ThemeProvider>
      <ToastContainer />
    </Context>
  );
}

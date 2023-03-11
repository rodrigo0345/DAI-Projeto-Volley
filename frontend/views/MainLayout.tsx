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
  Routes,
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

export default function MainLayout() {
  const { user } = useContext(UserContext);
  return (
    <Context>
      <ThemeProvider>
        <AppLayout className='' primarySection='drawer'>
          <MainHeader></MainHeader>
          <Suspense fallback={<Placeholder />}>
            <Routes>
              <Route element={<GuestsRoute />}>
                <Route element={<LoginPageView />} path='/login'></Route>
                <Route element={<LandPageView />} path='/'></Route>
              </Route>
            </Routes>
          </Suspense>
          <MainFooter></MainFooter>
        </AppLayout>
      </ThemeProvider>
    </Context>
  );
}

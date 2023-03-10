import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { Suspense } from 'react';
import { NavLink, Outlet, BrowserRouter as Router } from 'react-router-dom';
import css from './MainLayout.module.css';
import MainHeader from 'Frontend/components/headers/MainHeader';
import MainFooter from 'Frontend/components/footers/MainFooter';
import ThemeProvider from 'Frontend/contexts/themeContext';
import Context from 'Frontend/contexts/UserContext';

export default function MenuLayout() {
  return (
    <ThemeProvider>
      <Context>
        <AppLayout className='' primarySection='drawer'>
          <MainHeader></MainHeader>
          <Suspense fallback={<Placeholder />}>
            <Router></Router>
          </Suspense>
          <MainFooter></MainFooter>
        </AppLayout>
      </Context>
    </ThemeProvider>
  );
}

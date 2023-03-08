import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {
  MenuProps,
  routes,
  useViewMatches,
  ViewRouteObject,
} from 'Frontend/routes.js';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './MainLayout.module.css';
import MainHeader from 'Frontend/components/headers/MainHeader';
import MainFooter from 'Frontend/components/footers/MainFooter';
import ThemeProvider from 'Frontend/contexts/themeContext';

type MenuRoute = ViewRouteObject &
  Readonly<{
    path: string;
    handle: Required<MenuProps>;
  }>;

export default function MenuOnLeftLayout() {
  const matches = useViewMatches();

  const currentTitle = matches[matches.length - 1]?.handle?.title ?? 'Unknown';

  const menuRoutes = (routes[0]?.children || []).filter(
    (route) =>
      route.path && route.handle && route.handle.icon && route.handle.title
  ) as readonly MenuRoute[];

  return (
    <ThemeProvider>
      <AppLayout className='' primarySection='drawer'>
        <MainHeader></MainHeader>
        <Suspense fallback={<Placeholder />}>
          <Outlet />
        </Suspense>
        <MainFooter></MainFooter>
      </AppLayout>
    </ThemeProvider>
  );
}

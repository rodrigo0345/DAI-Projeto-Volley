import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext } from 'react';

export function PrivateAdminRoute({
  children,
  ...rest
}: {
  children: React.ReactNode;
  rest: any;
}) {
  const user = useContext(UserContext);

  return user && user?.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateManagerRoute({
  children,
  ...rest
}: {
  children: React.ReactNode;
  rest: any;
}) {
  const user = useContext(UserContext);

  return user && user?.role?.includes('MANAGER' || 'ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateRouteNoGuests({
  children,
  ...rest
}: {
  children: React.ReactNode;
  rest: any;
}) {
  const user = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to='/' />;
}

export function GuestsRoute() {
  const user = useContext(UserContext);

  return !user ? <Outlet /> : <Navigate to='/dashboard' />;
}

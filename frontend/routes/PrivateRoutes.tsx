import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext, useEffect, useState } from 'react';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';

export function PrivateAdminRoute() {
  const { user } = useContext(UserContext);
  return user && user?.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateManagerRoute() {
  const { user } = useContext(UserContext);
  return user && user?.role?.includes('MANAGER' || 'ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateRouteNoGuests() {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to='/' />;
}

export function GuestsRoute() {
  const { user } = useContext(UserContext);
  return !user ? <Outlet /> : <Navigate to='/dashboard' />;
}

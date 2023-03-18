import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext, useEffect, useState } from 'react';

export function PrivateManagerRoute() {
  let { user } = useContext(UserContext);

  if (!user) {
    user = JSON.parse(localStorage.user);
  }

  return user && user?.role?.includes('MANAGER' || 'ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateRouteNoGuests() {
  let { user } = useContext(UserContext);

  if (!user) {
    user = JSON.parse(localStorage.user);
  }

  return user ? <Outlet /> : <Navigate to='/' />;
}

export function GuestsRoute() {
  let { user } = useContext(UserContext);

  if (!user) {
    user = JSON.parse(localStorage.user);
  }

  return !user ? <Outlet /> : <Navigate to='/dashboard' />;
}

export function PrivateAdminRoute() {
  let { user } = useContext(UserContext);

  if (!user) {
    user = JSON.parse(localStorage.user);
  }

  return user && user.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

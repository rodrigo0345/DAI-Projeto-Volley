import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext, useEffect, useState } from 'react';

export function PrivateManagerRoute() {
  const { user } = useContext(UserContext);
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
  console.log('Only guests route', Date.now(), { user });

  return !user ? <Outlet /> : <Navigate to='/dashboard' />;
}

export function PrivateAdminRoute() {
  let { user, reAuthenticate } = useContext(UserContext);

  if (!user) {
    user = JSON.parse(localStorage.user);
  }

  return user && user.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

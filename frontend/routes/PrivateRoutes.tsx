import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext, useEffect, useState } from 'react';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';

export function PrivateManagerRoute() {
  let { user, reAuthenticate } = useContext(UserContext);

  (async () => {
    if (!user) {
      user = await reAuthenticate();
    }
  })();

  return user && user?.role?.includes('MANAGER' || 'ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateRouteNoGuests() {
  let { user, reAuthenticate } = useContext(UserContext);

  (async () => {
    if (!user) {
      user = await reAuthenticate();
    }
  })();

  return user ? <Outlet /> : <Navigate to='/' />;
}

export function GuestsRoute() {
  let { user, reAuthenticate } = useContext(UserContext);

  

  return !user ? <Outlet /> : <Navigate to='/dashboard' />;
}

export function PrivateAdminRoute() {
  let { user, reAuthenticate } = useContext(UserContext);

  (async () => {
    if (!user) {
      user = await reAuthenticate();
    }
  })();

  return user && user.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

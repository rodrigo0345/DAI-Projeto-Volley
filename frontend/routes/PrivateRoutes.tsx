import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'Frontend/contexts/UserContext';
import { ReactNode, useContext, useEffect, useState } from 'react';

function getUserFromStorage() {
  let user = undefined;

  if (localStorage.user) {
    try {
      user = JSON.parse(localStorage.user);
    } catch (e) {
      return undefined;
    }
  }

  return user;
}

export function PrivateManagerRoute() {
  let { user } = useContext(UserContext);

  let userAux = user ? user : getUserFromStorage();

  return userAux && userAux?.role?.includes('MANAGER' || 'ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

export function PrivateRouteNoGuests() {
  let { user } = useContext(UserContext);

  let userAux = user ? user : getUserFromStorage();
  return userAux ? <Outlet /> : <Navigate to='/' />;
}

export function GuestsRoute() {
  let { user } = useContext(UserContext);

  let userAux = user ? user : getUserFromStorage();
  return !userAux ? <Outlet /> : <Navigate to='/dashboard' />;
}

export function PrivateAdminRoute() {
  let { user } = useContext(UserContext);

  let userAux = user ? user : getUserFromStorage();
  return userAux && userAux.role?.includes('ADMIN') ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
}

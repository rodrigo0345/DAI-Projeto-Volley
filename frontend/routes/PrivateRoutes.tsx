import { Route, Navigate } from 'react-router-dom';
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

  return (
    <Route {...rest}>
      {user && user?.role?.includes('ADMIN') ? children : <Navigate to='/' />}
    </Route>
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

  return (
    <Route {...rest}>
      {user && user?.role?.includes('ADMIN' || 'MANAGER') ? (
        children
      ) : (
        <Navigate to='/' />
      )}
    </Route>
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

  return <Route {...rest}>{user ? children : <Navigate to='/' />}</Route>;
}

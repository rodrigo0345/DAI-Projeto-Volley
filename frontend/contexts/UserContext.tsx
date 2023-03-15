import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { redirect } from 'react-router-dom';

export const UserContext = createContext<{
  user: LoginUser | undefined;
  login: (user: LoginUser) => void;
  logout: () => void;
}>({ user: undefined, login: () => {}, logout: () => {} });

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<LoginUser | undefined>();

  function getUserFromStorage() {
    const userFromStorage = localStorage.user;
    if (userFromStorage) {
      return JSON.parse(userFromStorage);
    }
    return null;
  }

  function saveUserToStorage(user: LoginUser | null) {
    localStorage.user = JSON.stringify(user);
  }

  function logout() {
    window.location.href = '/login';
    setUser(undefined);
    saveUserToStorage(null);
  }

  function login(user: LoginUser) {
    setUser(user);
    saveUserToStorage(user);
  }

  useEffect(() => {
    setUser(getUserFromStorage());
    console.log(getUserFromStorage());
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

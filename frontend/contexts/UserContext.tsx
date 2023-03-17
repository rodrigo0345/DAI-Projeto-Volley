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
import { validateToken } from 'Frontend/generated/AuthenticationController';
import AuthenticationRequest from 'Frontend/generated/com/example/application/controller/Auth/AuthenticationRequest';
import { toast } from 'react-toastify';

export const UserContext = createContext<{
  user: LoginUser | undefined;
  login: (user: LoginUser) => void;
  logout: () => void;
}>({ user: undefined, login: () => {}, logout: () => {} });

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<LoginUser | undefined>();

  async function getUserFromStorage() {
    const userFromStorage = localStorage.user;

    let user: LoginUser | null = null;
    if (userFromStorage) {
      user = JSON.parse(userFromStorage);
    }

    if (!user) {
      return null;
    }

    const validToken = await validateToken(user, user.stringToken);
    if (!validToken) {
      toast.error('Your session has expired, please login again');
      return null;
    }

    return user;
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
    (async () => {
      const user = await getUserFromStorage();
      if (!user) {
        return;
      }
      setUser(user);
      console.log({ stored: user });
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

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
import AuthenticationRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers//AuthenticationRequest';
import { toast } from 'react-toastify';
import { validateToken } from 'Frontend/generated/AuthenticationController';

export const UserContext = createContext<{
  user: LoginUser | undefined;
  login: (user: LoginUser) => void;
  logout: () => void;
  reAuthenticate: () => Promise<LoginUser | undefined>;
}>({
  user: undefined,
  login: () => {},
  logout: () => {},
  reAuthenticate: () => Promise.resolve(undefined),
});

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<LoginUser | undefined>();

  async function validateUser() {
    
  }

  async function getUserFromStorage() {
    const userFromStorage = localStorage.user;

    let user: LoginUser | undefined = undefined;
    if (userFromStorage) {
      try {
        user = JSON.parse(userFromStorage) as LoginUser;
      } catch (e) {
        user = undefined;
      }
    }

    if (!user) {
      return null;
    }

    let validToken;
    try {
      validToken = await validateToken(user, user.stringToken);
    } catch (e) {
      console.log(e);
    }

    if (!validToken?.body) {
      toast.error('Your session has expired, please login again');
      logout();
      return undefined;
    }
    return user;
  }

  function saveUserToStorage(user: LoginUser | null) {
    localStorage.user = JSON.stringify(user);
  }

  function logout() {
    setUser(undefined);
    saveUserToStorage(null);
    window.location.href = '/login';
  }

  function login(user: LoginUser) {
    setUser(user);
    saveUserToStorage(user);
  }

  async function reAuthenticate() {
    let userAux;
    userAux = await getUserFromStorage();

    if (!userAux) {
      logout();
      return undefined;
    }
    return userAux;
  }

  useEffect(() => {
    (async () => {
      const user = await getUserFromStorage();
      if (!user) {
        return;
      }
      setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, reAuthenticate }}>
      {children}
    </UserContext.Provider>
  );
}

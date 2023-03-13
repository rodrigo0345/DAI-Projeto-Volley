import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import User from 'Frontend/generated/com/example/application/model/User/User';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const UserContext = createContext<{
  user: LoginUser | null;
  login: (user: LoginUser) => void;
  logout: () => void;
}>({ user: null, login: () => {}, logout: () => {} });

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<LoginUser | null>(null);

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
    setUser(null);
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

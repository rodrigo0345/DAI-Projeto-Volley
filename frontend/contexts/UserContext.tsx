import User from 'Frontend/generated/com/example/application/model/User/User';
import { createContext, useState } from 'react';

export const UserContext = createContext<User | null>(null);

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

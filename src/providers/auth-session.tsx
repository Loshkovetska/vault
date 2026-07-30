import { useSession } from '@/lib/hooks/use-session';
import { useGetUserQuery } from '@/lib/store/users';
import { User } from '@/lib/types/user';
import { createContext, useContext } from 'react';

type AuthSessionContextType = {
  session?: string | null;
  currentUser?: User | null;
  setSession: (user_id: string | undefined, cb: () => void) => void;
  clearSession: (cb: () => void) => void;
};

const AuthSessionContext = createContext<AuthSessionContextType>({
  session: null,
  currentUser: null,
  setSession: () => {},
  clearSession: () => {},
});

export const useAuth = () => useContext(AuthSessionContext);

export function AuthSession(props: React.PropsWithChildren) {
  const { session, setSession, clearSession } = useSession();

  const { data: currentUser } = useGetUserQuery(session ?? '', {
    skip: !session,
  });
  return (
    <AuthSessionContext.Provider
      value={{ session, currentUser, setSession, clearSession }}
      {...props}
    />
  );
}

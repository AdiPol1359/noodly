import { useUser } from 'hooks/useUser';

import type { ReactNode } from 'react';

type Props = Readonly<{
  loggedIn?: boolean;
  children: ReactNode;
}>;

export const AuthContent = ({ loggedIn = true, children }: Props) => {
  const { isLoading, data } = useUser();

  if (isLoading || !!data !== loggedIn) {
    return null;
  }

  return <>{children}</>;
};

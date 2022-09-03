import { useUser } from 'hooks/useUser';

import type { ReactNode } from 'react';

export type PrivateContentProps = Readonly<{
  loggedIn: boolean;
  children: ReactNode;
}>;

export const PrivateContent = ({ loggedIn = true, children }: PrivateContentProps) => {
  const { isLoading, data } = useUser();

  if (isLoading || !!data !== loggedIn) {
    return null;
  }

  return <>{children}</>;
};

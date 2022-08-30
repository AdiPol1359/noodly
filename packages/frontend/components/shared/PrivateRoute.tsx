import { useUser } from 'hooks/useUser';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import type { ReactNode } from 'react';

type Props = Readonly<{
  loggedIn?: boolean;
  path: string;
  children: ReactNode;
}>;

export const PrivateRoute = ({ loggedIn = true, path, children }: Props) => {
  const { replace } = useRouter();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && !!data !== loggedIn) {
      replace(path);
    }
  }, [data, isLoading, loggedIn, path, replace]);

  if (isLoading || !!data !== loggedIn) {
    return null;
  }

  return <>{children}</>;
};

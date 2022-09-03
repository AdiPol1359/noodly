import { useUser } from 'hooks/useUser';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivateContent } from 'components/shared/PrivateContent';

import type { PrivateContentProps } from 'components/shared/PrivateContent';

type Props = Readonly<{
  path: string;
}> &
  PrivateContentProps;

export const PrivateRoute = ({ children, ...rest }: Props) => {
  const { replace } = useRouter();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && !!data !== rest.loggedIn) {
      replace(rest.path);
    }
  }, [data, isLoading, replace, rest.loggedIn, rest.path]);

  return <PrivateContent {...rest}>{children}</PrivateContent>;
};

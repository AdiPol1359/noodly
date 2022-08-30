import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouteChange = (handler: () => unknown) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handler);

    return () => router.events.off('routeChangeComplete', handler);
  }, [router.events, handler]);
};

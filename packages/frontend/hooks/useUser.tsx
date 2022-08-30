import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSession, deleteSession, getSession } from 'services/session.service';
import { createUser } from 'services/user.service';

import type { Session } from '@noodly/common';

export const useUser = () => {
  const queryClient = useQueryClient();
  const result = useQuery(
    ['session'],
    async () => {
      try {
        return await getSession();
      } catch (err) {
        return null;
      }
    },
    { staleTime: Infinity, retry: false }
  );

  const setSessionQueryData = (data: Session | null) => {
    queryClient.setQueryData(['session'], data);
  };

  const loginMutation = useMutation(createSession, {
    onSuccess: setSessionQueryData,
  });

  const logoutMutation = useMutation(deleteSession, {
    onSuccess: setSessionQueryData,
  });

  const registerMutation = useMutation(createUser);

  return { loginMutation, logoutMutation, registerMutation, ...result } as const;
};

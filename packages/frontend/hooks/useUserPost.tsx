import { useQuery } from '@tanstack/react-query';
import { getPost } from 'services/post.service';
import { useUser } from './useUser';

export const useUserPost = (id: number) => {
  const { data: userData } = useUser();

  const result = useQuery(
    ['user', userData?.username, 'post', id],
    () => getPost(id, { username: userData?.username }),
    {
      enabled: !!id && !!userData,
      retry: false,
      cacheTime: 0,
    }
  );

  return result;
};

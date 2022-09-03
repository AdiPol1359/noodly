import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from 'services/post.service';
import { useUser } from './useUser';

export const useUserPosts = () => {
  const { data: userData } = useUser();

  const result = useQuery(['user', userData?.username, 'posts'], () => getAllPosts({ username: userData?.username }), {
    enabled: !!userData,
  });

  return result;
};

import { Alert, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PostForm } from 'components/dashboard/PostForm/PostForm';
import { useUser } from 'hooks/useUser';
import { useRouter } from 'next/router';
import { getPost } from 'services/post.service';

export const DashboardEditPostPageContent = () => {
  const { slug } = useRouter().query;

  const { data: userData } = useUser();

  const { data, isLoading, isError } = useQuery(
    ['user', userData?.username, 'post', slug],
    async () => {
      return await getPost(Number(slug), { username: userData?.username });
    },
    {
      enabled: !!slug && !!userData,
      retry: false,
      cacheTime: 0,
    }
  );

  if (isLoading) {
    return <CircularProgress color="success" sx={{ display: 'block', margin: 'auto' }} />;
  }

  if (isError) {
    return <Alert severity="error">Ten post nie należy do Ciebie!</Alert>;
  }

  return <PostForm {...data} editMode />;
};

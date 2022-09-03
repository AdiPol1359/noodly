import { Alert, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { PostForm } from 'components/dashboard/PostForm/PostForm';
import { useUserPost } from 'hooks/useUserPost';
import { useRouter } from 'next/router';
import { updatePost } from 'services/post.service';

export const DashboardEditPostPageContent = () => {
  const { slug } = useRouter().query;

  const { data, isLoading, isError } = useUserPost(Number(slug));

  const updatePostMutation = useMutation(updatePost);

  if (isLoading) {
    return <CircularProgress color="success" sx={{ display: 'block', margin: 'auto' }} />;
  }

  if (isError) {
    return <Alert severity="error">Ten post nie należy do Ciebie!</Alert>;
  }

  return (
    <PostForm
      post={data}
      isLoading={updatePostMutation.isLoading}
      onSubmit={async (body) => {
        await updatePostMutation.mutateAsync({ id: data.id, body });
      }}
    />
  );
};

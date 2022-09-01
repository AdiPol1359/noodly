import { useMutation } from '@tanstack/react-query';
import { PostForm } from 'components/dashboard/PostForm/PostForm';
import { createPost } from 'services/post.service';

export const DashboardAddPostPageContent = () => {
  const createPostMutation = useMutation(createPost);

  return (
    <PostForm
      isLoading={createPostMutation.isLoading}
      onSubmit={async (data) => {
        await createPostMutation.mutateAsync(data);
      }}
    />
  );
};

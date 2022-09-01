import * as yup from 'yup';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { FormInput } from 'components/shared/FormInput';
import { PostEditor } from './PostEditor';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from 'services/post.service';
import { useYupForm } from 'hooks/useYupForm';
import { REQUIRED_FIELD_ERROR_MESSAGE } from 'contants';

import type { Post } from '@noodly/common';
import type { InferType } from 'yup';

const schema = yup.object({
  title: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  introduction: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

type Props = Readonly<{
  onSubmit: (data: InferType<typeof schema> & { content: string }) => Promise<void>;
  isLoading: boolean;
  post?: Post;
}>;

export const PostForm = ({ post, isLoading, onSubmit }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(post?.content || '');

  const deletePostMutation = useMutation(deletePost);

  const redirect = () => router.push('/dashboard/posts');

  const {
    handleFormSubmit,
    register,
    formState: { errors },
  } = useYupForm(
    schema,
    async (data) => {
      if (value.length === 0) {
        return;
      }

      await onSubmit({ content: value, ...data });
      redirect();
    },
    {
      defaultValues: { title: post?.title, introduction: post?.introduction },
    }
  );

  const handleDeleteButtonClick = () => {
    if (post) {
      deletePostMutation.mutate(post.id, { onSuccess: redirect });
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleFormSubmit}>
      <FormInput
        label="Tytuł posta"
        placeholder="Wpisz tytuł posta"
        sx={{ mb: 2 }}
        inputError={errors.title}
        autoComplete="off"
        {...register('title')}
      />

      <FormInput
        label="Wprowadzenie do posta"
        placeholder="Wpisz wprowadzenie do posta"
        sx={{ mb: 2 }}
        inputError={errors.introduction}
        autoComplete="off"
        {...register('introduction')}
      />

      <PostEditor value={value} onChange={setValue} />

      <LoadingButton variant="contained" color="success" type="submit" loading={isLoading}>
        {post ? 'Edytuj' : 'Utwórz'} post
      </LoadingButton>

      {post && (
        <LoadingButton
          variant="contained"
          color="error"
          sx={{ mt: 1.5 }}
          onClick={handleDeleteButtonClick}
          loading={deletePostMutation.isLoading}
        >
          Usuń post
        </LoadingButton>
      )}
    </Box>
  );
};

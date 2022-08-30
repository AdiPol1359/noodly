import * as yup from 'yup';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { FormInput } from 'components/shared/FormInput';
import { PostEditor } from './PostEditor';
import { useMutation } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from 'services/post.services';
import { useYupForm } from 'hooks/useYupForm';
import { isApiError } from 'lib/axios';
import { useAlert } from 'hooks/useAlert';

const schema = yup.object({
  title: yup.string().required('Uzupełnij to pole'),
  introduction: yup.string().required('Uzupełnij to pole'),
});

type Props = Readonly<{
  title?: string;
  introduction?: string;
  content?: string;
  uuid?: string;
  editMode?: boolean;
}>;

export const PostForm = ({ title, introduction, uuid, content = '', editMode = false }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(content);
  const [alert, showAlert] = useAlert({ mb: 3.5 });

  const createPostMutation = useMutation(createPost);
  const updatePostMutation = useMutation(updatePost);
  const deletePostMutation = useMutation(deletePost);

  const handleMutationError = (err: unknown) => {
    if (isApiError(err)) {
      showAlert({ severity: 'error', message: err.response?.data.message || '' });
    }
  };

  const {
    handleFormSubmit,
    register,
    formState: { errors },
  } = useYupForm(
    schema,
    ({ title, introduction }) => {
      if (value.length === 0) {
        return;
      }

      editMode
        ? uuid &&
          updatePostMutation.mutate(
            { uuid: uuid, body: { title, introduction, content: value } },
            { onSuccess: redirect, onError: handleMutationError }
          )
        : createPostMutation.mutate(
            { title, introduction, content: value },
            { onSuccess: redirect, onError: handleMutationError }
          );
    },
    {
      defaultValues: { title, introduction },
    }
  );

  const redirect = () => router.push('/dashboard/posts');

  const handleDeleteButtonClick = () => {
    if (uuid) {
      deletePostMutation.mutate(uuid, { onSuccess: redirect });
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleFormSubmit}>
      {alert}

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

      <LoadingButton
        variant="contained"
        color="success"
        type="submit"
        loading={createPostMutation.isLoading || updatePostMutation.isLoading}
      >
        {editMode ? 'Edytuj' : 'Utwórz'} post
      </LoadingButton>

      {editMode && (
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

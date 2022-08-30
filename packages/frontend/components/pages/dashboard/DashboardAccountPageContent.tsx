import * as yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { FormInput } from 'components/shared/FormInput';
import { useYupForm } from 'hooks/useYupForm';
import { useUser } from 'hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from 'services/user.service';
import { useAlert } from 'hooks/useAlert';
import {
  FULL_NAME_ERROR_MESSAGE,
  USERNAME_ERROR_MESSAGE,
  REQUIRED_FIELD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from 'contants';
import { FULL_NAME_REGEX, EMAIL_REGEX, USERNAME_REGEX, PASSWORD_REGEX } from '@noodly/common';
import { isApiError } from 'lib/axios';
import { StatusCodes } from 'http-status-codes';

import type { Session } from '@noodly/common';

const schema = yup.object({
  fullName: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(FULL_NAME_REGEX, FULL_NAME_ERROR_MESSAGE),
  username: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(USERNAME_REGEX, USERNAME_ERROR_MESSAGE),
  email: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),
  password: yup.string().nullable().matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  description: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

const createDefaultValues = (data: Session | null | undefined) => ({
  fullName: `${data?.details.firstName}${data?.details.lastName ? ` ${data?.details.lastName}` : ''}`,
  username: data?.username,
  email: data?.email,
  password: null,
  description: data?.profile.description,
});

export const DashboardAccountPageContent = () => {
  const { data, refetch } = useUser();
  const [alert, showAlert] = useAlert({ mb: 3 });

  const updateUserMutation = useMutation(updateUser);

  const {
    handleFormSubmit,
    register,
    reset,
    formState: {
      dirtyFields,
      errors: { fullName, username, email, password, description },
    },
  } = useYupForm(
    schema,
    (formData) => {
      const body = Object.fromEntries(
        Object.entries(formData).filter(([key]) => !!dirtyFields[key as keyof typeof dirtyFields])
      );

      if (data) {
        updateUserMutation.mutate(
          { userId: data.id, body },
          {
            onSuccess: async () => {
              const { data: refetchData } = await refetch();

              reset(createDefaultValues(refetchData));
              showAlert({ severity: 'success', message: 'Twoje dane zostały pomyślnie zaktualizowane!' });
            },
            onError: (err) => {
              if (isApiError(err)) {
                showAlert({
                  severity: 'error',
                  message:
                    err.response?.status === StatusCodes.CONFLICT
                      ? 'Ten użytkownik jest już zarejestowany!'
                      : SERVER_ERROR_MESSAGE,
                });
              }
            },
          }
        );
      }
    },
    {
      defaultValues: createDefaultValues(data),
    }
  );

  return (
    <>
      {alert}

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleFormSubmit}>
        <FormInput
          type="text"
          label="Twoje imie"
          placeholder="Wpisz swoje imie"
          inputError={fullName}
          autoComplete="off"
          {...register('fullName')}
        />

        <FormInput
          type="text"
          label="Nazwa użytkownika"
          placeholder="Wpisz swoją nazwę użytkownika"
          inputError={username}
          autoComplete="off"
          {...register('username')}
        />

        <FormInput
          type="email"
          label="Adres email"
          placeholder="Wpisz swój adres email"
          inputError={email}
          autoComplete="off"
          {...register('email')}
        />

        <FormInput
          label="Opis profilu"
          placeholder="Wpisz swój opis profilu"
          inputError={description}
          autoComplete="off"
          {...register('description')}
        />

        <FormInput
          type="password"
          label="Hasło"
          placeholder="Wpisz swoje hasło"
          inputError={password}
          autoComplete="off"
          {...register('password')}
        />

        <LoadingButton
          variant="contained"
          color="success"
          type="submit"
          sx={{ mt: 3 }}
          loading={updateUserMutation.isLoading}
          disabled={Object.keys(dirtyFields).length === 0}
        >
          Zapisz zmiany
        </LoadingButton>
      </Box>
    </>
  );
};

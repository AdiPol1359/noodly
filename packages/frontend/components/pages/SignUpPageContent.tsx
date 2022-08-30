import * as yup from 'yup';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import RepeatIcon from '@mui/icons-material/Repeat';

import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { EntryForm } from 'components/base/EntryForm';
import { FormInput } from 'components/shared/FormInput';
import { isApiError } from 'lib/axios';
import { StatusCodes } from 'http-status-codes';
import { useAlert } from 'hooks/useAlert';
import { useUser } from 'hooks/useUser';
import { useYupForm } from 'hooks/useYupForm';
import { Controller } from 'react-hook-form';
import {
  EMAIL_ERROR_MESSAGE,
  FULL_NAME_ERROR_MESSAGE,
  USERNAME_ERROR_MESSAGE,
  LOGIN_PAGE_PATH,
  PASSWORD_ERROR_MESSAGE,
  REQUIRED_FIELD_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from 'contants';
import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, FULL_NAME_REGEX } from '@noodly/common';

const schema = yup.object({
  fullName: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(FULL_NAME_REGEX, FULL_NAME_ERROR_MESSAGE),
  username: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(USERNAME_REGEX, USERNAME_ERROR_MESSAGE),
  email: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),
  password: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Wpisane hasła nie są takie same')
    .required(REQUIRED_FIELD_ERROR_MESSAGE),
  acceptRules: yup.bool().oneOf([true], 'Proszę zaakceptować regulamin'),
});

export const SignUpPageContent = () => {
  const [alert, showAlert] = useAlert();

  const { registerMutation } = useUser();

  const {
    handleFormSubmit,
    register,
    reset,
    control,
    formState: {
      errors: { fullName, username, email, password, confirmPassword, acceptRules },
    },
  } = useYupForm(schema, (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        showAlert({ severity: 'success', message: 'Twoje konto zostało pomyślnie utworzone!' });
        reset();
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
    });
  });

  return (
    <EntryForm
      title="Zarejestruj się"
      leftText="Regulamin serwisu"
      leftPath="/rules"
      rightText="Masz już konto?"
      rightPath={LOGIN_PAGE_PATH}
      onSubmit={handleFormSubmit}
    >
      {alert}

      <FormInput
        variant="outlined"
        label="Twoje imie *"
        placeholder="Wpisz swoje imie"
        inputError={fullName}
        icon={PersonIcon}
        {...register('fullName')}
      />

      <FormInput
        variant="outlined"
        label="Nazwa użytkownika *"
        placeholder="Wpisz swoją nazwę użytkownika"
        inputError={username}
        icon={EmojiEmotionsIcon}
        {...register('username')}
      />

      <FormInput
        type="email"
        variant="outlined"
        label="Email *"
        placeholder="Wpisz swój email"
        inputError={email}
        icon={AlternateEmailIcon}
        {...register('email')}
      />

      <FormInput
        type="password"
        variant="outlined"
        label="Hasło *"
        placeholder="Wpisz swoje hasło"
        inputError={password}
        icon={KeyIcon}
        {...register('password')}
      />

      <FormInput
        type="password"
        variant="outlined"
        label="Potwórz hasło *"
        placeholder="Potwórz swoje hasło"
        inputError={confirmPassword}
        icon={RepeatIcon}
        {...register('confirmPassword')}
      />

      <FormControl error={!!acceptRules}>
        <FormControlLabel
          control={
            <Controller
              name="acceptRules"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, ...field } }) => <Checkbox checked={!!value} {...field} />}
            />
          }
          label="Akceptuje regulamin"
          {...register('acceptRules')}
        />
        {acceptRules && <FormHelperText>{acceptRules.message}</FormHelperText>}
      </FormControl>
    </EntryForm>
  );
};

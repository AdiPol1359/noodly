import * as yup from 'yup';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';

import { FormControlLabel, Checkbox } from '@mui/material';
import { EntryForm } from 'components/base/EntryForm';
import { FormInput } from 'components/shared/FormInput';
import { useUser } from 'hooks/useUser';
import { useAlert } from 'hooks/useAlert';
import { isApiError } from 'lib/axios';
import { StatusCodes } from 'http-status-codes';
import { useYupForm } from 'hooks/useYupForm';
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  REGISTER_PAGE_PATH,
  REQUIRED_FIELD_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from 'contants';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@noodly/common';

const schema = yup.object({
  email: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE),
  password: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE).matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
});

export const SignInPageContent = () => {
  const [alert, showAlert] = useAlert();

  const { loginMutation } = useUser();

  const {
    register,
    handleFormSubmit,
    formState: {
      errors: { email, password },
    },
  } = useYupForm(schema, (data) => {
    loginMutation.mutate(data, {
      onError: (err) => {
        if (isApiError(err)) {
          showAlert({
            severity: 'error',
            message:
              err.response?.status === StatusCodes.NOT_FOUND
                ? 'Nie znaleziono użytkownika w bazie danych!'
                : SERVER_ERROR_MESSAGE,
          });
        }
      },
    });
  });

  return (
    <EntryForm
      title="Zaloguj się"
      leftText="Zapomniałeś hasła?"
      leftPath="#"
      rightText="Nie masz jeszcze konta?"
      rightPath={REGISTER_PAGE_PATH}
      onSubmit={handleFormSubmit}
    >
      {alert}

      <FormInput
        type="text"
        variant="outlined"
        label="Email"
        placeholder="Wpisz twój email"
        icon={AlternateEmailIcon}
        inputError={email}
        {...register('email')}
      />

      <FormInput
        type="password"
        variant="outlined"
        label="Hasło"
        placeholder="Wpisz swoje hasło"
        icon={KeyIcon}
        inputError={password}
        {...register('password')}
      />

      <FormControlLabel control={<Checkbox defaultChecked />} label="Zapamiętaj mnie" />
    </EntryForm>
  );
};

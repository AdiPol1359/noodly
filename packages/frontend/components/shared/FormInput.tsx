import { InputAdornment, TextField } from '@mui/material';
import { forwardRef } from 'react';

import type { TextFieldProps, SvgIconTypeMap } from '@mui/material';
import type { FieldError } from 'react-hook-form';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

type Props = Readonly<{
  inputError?: FieldError;
  icon?: OverridableComponent<SvgIconTypeMap>;
}> &
  TextFieldProps;

export const FormInput = forwardRef<HTMLInputElement, Props>(({ inputError, icon: Icon, ...rest }, ref) => (
  <TextField
    InputProps={{
      startAdornment: Icon && (
        <InputAdornment position="start">
          <Icon />
        </InputAdornment>
      ),
    }}
    ref={ref}
    {...(inputError && { error: true, helperText: inputError.message })}
    {...rest}
  />
));

FormInput.displayName = 'FormInput';

import { TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

type TypeInput = 'text' | 'password' | 'email' | 'number' | 'date';

const InputText = ({
  type,
  name,
  control,
  label = name,
  required = false,
  errors,
  rules,
}: {
  type: TypeInput;
  name: string;
  control: unknown;
  label?: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  rules?: unknown;
}) => {
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={{
        ...(rules as
          | Omit<
              RegisterOptions<FieldValues, string>,
              'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
            >
          | undefined),
        required,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          error={errors && errors[name as keyof typeof errors] ? true : false}
          margin="normal"
          required={required}
          fullWidth
          label={label}
          autoComplete={name}
          type={type}
          helperText={
            errors && errors[name as keyof typeof errors]
              ? errors[name as keyof typeof errors]?.message
                ? `${errors[name as keyof typeof errors]?.message}`
                : `El campo ${label} es requerido`
              : ''
          }
        />
      )}
    />
  );
};

export default InputText;

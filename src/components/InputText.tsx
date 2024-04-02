import { TextField } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';

type TypeInput = 'text' | 'password' | 'email' | 'number';

const InputText = ({
  type,
  name,
  control,
  label = name,
  required = false,
  errors,
}: {
  type: TypeInput;
  name: string;
  control: unknown;
  label?: string;
  required?: boolean;
  errors: unknown;
}) => {
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={{ required }}
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
              ? `El campo ${label} es requerido`
              : ''
          }
        />
      )}
    />
  );
};

export default InputText;

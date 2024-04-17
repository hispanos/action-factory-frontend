import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { SelectOptions } from '../interfaces/Inputs';

const InputSelect = ({
  name,
  control,
  label = name,
  required = false,
  errors,
  options,
}: {
  name: string;
  control: unknown;
  label?: string;
  required?: boolean;
  errors: unknown;
  options: SelectOptions;
}) => {
  return (
    <FormControl
      fullWidth
      error={errors && errors[name as keyof typeof errors] ? true : false}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={{ required }}
        render={({ field }) => (
          <>
            <Select
              {...field}
              required={required}
              fullWidth
              value={field.value || ''}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors && errors[name as keyof typeof errors]
                ? `El campo ${label} es requerido`
                : ''}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export default InputSelect;

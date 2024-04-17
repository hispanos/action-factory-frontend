import { SubmitHandler, useForm } from 'react-hook-form';
import type { Employee, FormEmployee } from '../interfaces/Employee';
import { useContext, useEffect } from 'react';
import { AppContext } from '../routes/Routes';
import { saveEmployees, updateEmployee } from '../services/employee';
import { Box, Button, Typography } from '@mui/material';
import InputText from './InputText';
import InputSelect from './InputSelect';
import { regexEmail } from '../utils/regex';

const FormEmployeeSave = ({
  doRefresh,
  isEdit,
  employee,
}: {
  doRefresh: () => void;
  isEdit: boolean;
  employee: Employee | undefined;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormEmployee>();

  const { setAlert } = useContext(AppContext);

  const optionsState = [
    { value: 'ACTIVO', label: 'Activo' },
    { value: 'INACTIVO', label: 'Inactivo' },
  ];

  const optionsRole = [
    { value: '1', label: 'Coordinador' },
    { value: '2', label: 'Validador' },
  ];

  useEffect(() => {
    if (isEdit && employee) {
      setValue('name', employee.name);
      setValue('email', employee.email);
      setValue('role', employee.role.id as unknown as string);
      setValue('hiringDate', employee.hiringDate);
      setValue('state', employee.state);
    }
  }, [isEdit, employee]);

  const onSubmit: SubmitHandler<FormEmployee> = async (data) => {
    try {
      if (isEdit && employee) {
        // Edit employee
        const response = await updateEmployee(Number(employee.id), data);
        if (response?.data) {
          setAlert({
            open: true,
            message: 'Empleado editado con éxito.',
            type: 'success',
          });
          doRefresh();
        } else {
          setAlert({
            open: true,
            message: 'Hubo un problema al editar el empleado.',
            type: 'error',
          });
        }
        return;
      } else {
        // Save employee
        const response = await saveEmployees(data);
        if (response?.data) {
          setAlert({
            open: true,
            message: 'Empleado guardado con éxito.',
            type: 'success',
          });
          doRefresh();
        } else {
          setAlert({
            open: true,
            message: 'Hubo un problema al guardar el empleado.',
            type: 'error',
          });
        }
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Hubo un problema al guardar el empleado.',
        type: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Nuevo Empleado
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <InputText
          type="text"
          name="name"
          control={control}
          label="Nombre"
          required
          errors={errors}
        />
        <InputText
          type="email"
          name="email"
          control={control}
          label="Email"
          required
          errors={errors}
          rules={{
            pattern: {
              value: regexEmail,
              message: 'Email inválido',
            },
          }}
        />
        <InputSelect
          name="role"
          control={control}
          label="Rol"
          required
          errors={errors}
          options={optionsRole}
        />
        <InputText
          type="date"
          name="hiringDate"
          control={control}
          label="Fecha de contratación"
          required
          errors={errors}
        />
        <InputSelect
          name="state"
          control={control}
          label="Estado"
          required
          errors={errors}
          options={optionsState}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="success"
        >
          {isEdit ? 'Editar' : 'Guardar'}
        </Button>
      </Box>
    </Box>
  );
};

export default FormEmployeeSave;

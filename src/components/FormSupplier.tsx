import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from './InputText';
import type { FormSupplier, Supplier } from '../interfaces/Supplier';
import { saveSuppliers, updateSupplier } from '../services/supplier';
import { AppContext } from '../routes/Routes';

const FormSupplier = ({
  doRefresh,
  isEdit,
  supplier,
}: {
  doRefresh: () => void;
  isEdit: boolean;
  supplier: Supplier | undefined;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSupplier>();

  const { setAlert } = useContext(AppContext);

  useEffect(() => {
    if (isEdit && supplier) {
      setValue('name', supplier.name);
      setValue('address', supplier.address);
      setValue('telephoneNumber', supplier.telephoneNumber);
      setValue('email', supplier.email);
      setValue('webSite', supplier.webSite);
      setValue('sectorIndustry', supplier.sectorIndustry);
      setValue('registrationDate', supplier.registrationDate);
    }
  }, [isEdit, supplier]);

  const onSubmit: SubmitHandler<FormSupplier> = async (data) => {
    try {
      if (isEdit && supplier) {
        // Edit supplier
        const response = await updateSupplier(supplier.id, data);
        if (response?.data) {
          setAlert({
            open: true,
            message: 'Proveedor editado con éxito.',
            type: 'success',
          });
          doRefresh();
        } else {
          setAlert({
            open: true,
            message: 'Hubo un problema al editar el proveedor.',
            type: 'error',
          });
        }
        return;
      } else {
        // Save supplier
        const response = await saveSuppliers(data);
        if (response?.data) {
          setAlert({
            open: true,
            message: 'Proveedor guardado con éxito.',
            type: 'success',
          });
          doRefresh();
        } else {
          setAlert({
            open: true,
            message: 'Hubo un problema al guardar el proveedor.',
            type: 'error',
          });
        }
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Hubo un problema al guardar el proveedor.',
        type: 'error',
      });
    }
  };
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Nuevo Proveedor
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
          type="text"
          name="address"
          control={control}
          label="Dirección"
          required
          errors={errors}
        />
        <InputText
          type="text"
          name="telephoneNumber"
          control={control}
          label="Teléfono"
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
        />
        <InputText
          type="text"
          name="webSite"
          control={control}
          label="Sitio Web"
          required
          errors={errors}
        />
        <InputText
          type="text"
          name="sectorIndustry"
          control={control}
          label="Industria"
          required
          errors={errors}
        />
        <InputText
          type="date"
          name="registrationDate"
          control={control}
          label="Fecha de Registro"
          required
          errors={errors}
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

export default FormSupplier;

import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import TableComponent from '../components/TableComponent';
import { Columns } from '../interfaces/Table';
import { Supplier } from '../interfaces/Supplier';
import { useEffect, useState } from 'react';
import { deleteSupplier, getSuppliers } from '../services/supplier';
import ModalComponent from '../components/ModalComponent';
import FormSupplier from '../components/FormSupplier';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from '../components/AlertDialog';
import Toast from '../components/Toast';

const Suppliers = () => {
  const columnsSupplier: Columns<Supplier> = [
    { id: 'name', label: 'Nombre', name: 'name' },
    { id: 'address', label: 'Dirección', name: 'address' },
    {
      id: 'telephoneNumber',
      label: 'Teléfono',
      name: 'telephoneNumber',
    },
    { id: 'email', label: 'Email', name: 'email' },
    { id: 'webSite', label: 'Sitio Web', name: 'webSite' },
    {
      id: 'sectorIndustry',
      label: 'Industria',
      name: 'sectorIndustry',
    },
    {
      id: 'registrationDate',
      label: 'Fecha de Registro',
      name: 'registrationDate',
    },
    {
      id: 'actions',
      label: 'Acciones',
      name: 'actions',
      format: (supplier: Supplier) => {
        return (
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => editSupplier(supplier)}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onDeleteSupplier(supplier)}
            >
              <DeleteForeverIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    getData();
  }, [reload]);

  const getData = async () => {
    const response = await getSuppliers();
    if (response?.data) {
      setSuppliers(response.data);
    } else {
      setSuppliers([]);
    }
  };

  const newSupplier = () => {
    setIsEdit(false);
    setOpenModal(true);
  };

  const onDeleteSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setOpenAlert(true);
  };

  const editSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsEdit(true);
    setOpenModal(true);
  };

  const doRefresh = () => {
    setReload(!reload);
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setOpenAlert(false);
    if (currentSupplier) {
      // delete supplier
      const response = await deleteSupplier(currentSupplier.id);
      if (response?.data) {
        setAlert({
          open: true,
          message: 'El proveedor se eliminó correctamente',
          type: 'success',
        });
        setReload(!reload);
      } else {
        setAlert({
          open: true,
          message: 'Ocurrió un error al eliminar el proveedor',
          type: 'error',
        });
      }
    }
  };

  const handleOpenAlert = (status: boolean) => {
    setAlert({
      ...alert,
      open: status,
    });
  };

  return (
    <>
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
          <FormSupplier
            doRefresh={doRefresh}
            isEdit={isEdit}
            supplier={currentSupplier}
            setAlert={setAlert}
          />
        </ModalComponent>
      )}
      {openAlert && (
        <AlertDialog
          open={openAlert}
          setOpen={setOpenAlert}
          title="Estás seguro de eliminar el proveedor?"
          description="Esta acción no se puede deshacer."
          handleClick={handleDelete}
        />
      )}
      <Toast
        open={alert.open}
        setOpen={handleOpenAlert}
        type={alert.type as 'success' | 'error' | 'warning' | 'info'}
        message={alert.message}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" margin="2">
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Proveedores
              </Typography>
              <Button variant="contained" onClick={newSupplier}>
                Nuevo
              </Button>
            </Box>
            <TableComponent<Supplier>
              columns={columnsSupplier}
              rows={suppliers}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Suppliers;

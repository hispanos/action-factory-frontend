import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Device } from '../interfaces/Device';
import { updateStateDevice } from '../services/device';
import { AppContext } from '../routes/Routes';

const UpdateState = ({
  setOpenModal,
  device,
  doRefresh,
  setLoading,
}: {
  setOpenModal: (value: boolean) => void;
  device: Device | undefined;
  doRefresh: () => void;
  setLoading: (value: boolean) => void;
}) => {
  const [optionState, setOptionState] = useState('');
  const { setAlert } = useContext(AppContext);

  const updateState = async () => {
    if (device) {
      // update device state
      setLoading(true);
      const response = await updateStateDevice(
        device.imei.toString(),
        optionState
      );
      if (response?.data) {
        setAlert({
          open: true,
          message: 'Estado actualizado con éxito.',
          type: 'success',
        });
        doRefresh();
      } else {
        setAlert({
          open: true,
          message: 'Hubo un problema al actualizar el estado.',
          type: 'error',
        });
      }
      setLoading(true);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Actualizar estado
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <FormControl fullWidth>
          <InputLabel id="inputState-label">Seleccionar Estado</InputLabel>
          <Select
            labelId="inputState-label"
            id="inputState"
            value={optionState}
            label="Seleccionar Estado"
            onChange={(e) => setOptionState(e.target.value as string)}
          >
            <MenuItem value={'USADO'}>USADO</MenuItem>
            <MenuItem value={'CANCELADO'}>CANCELADO</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={updateState}>
          Aceptar
        </Button>
      </Box>
    </>
  );
};

export default UpdateState;

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Device } from '../interfaces/Device';

const UpdateState = ({
  setOpenModal,
  device
}: {
  setOpenModal: (value: boolean) => void;
  device: Device | undefined;
}) => {
  const [optionState, setOptionState] = useState('');

  const updateState = async () => {
    if (device) {
      // update device state
      setOpenModal(false);
    }
  }

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
        <Button
          variant="contained"
          color="primary"
          onClick={updateState}
        >
          Aceptar
        </Button>
      </Box>
    </>
  );
};

export default UpdateState;

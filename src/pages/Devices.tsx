import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import {
  getAllDevices,
  getDeviceByImei,
  getDevicesBySupplier,
} from '../services/device';
import { useEffect, useState } from 'react';
import { Columns, RowType } from '../interfaces/Table';
import TableComponent from '../components/TableComponent';
import { Device } from '../interfaces/Device';
import CachedIcon from '@mui/icons-material/Cached';
import ModalComponent from '../components/ModalComponent';
import UpdateState from '../components/UpdateState';

const Devices = () => {
  const columnsDevices: Columns<RowType> = [
    { id: 'validationID', label: 'Id de Validación', name: 'validationID' },
    { id: 'imei', label: 'Imei', name: 'imei' },
    {
      id: 'state',
      label: 'Estado',
      name: 'state',
      format: (row: RowType) => {
        return (
          <Box display="flex" alignItems="center">
            <p>{row.state}</p>
            <span>
              {row.state === 'LISTO_PARA_USAR' && (
                <IconButton color="primary" onClick={() => updateStatus(row)}>
                  <CachedIcon />
                </IconButton>
              )}
            </span>
          </Box>
        );
      },
    },
    { id: 'supplier', label: 'Proveedor', name: 'supplier' },
    { id: 'score', label: 'Puntuación', name: 'score' },
    {
      id: 'loadingDate',
      label: 'Fecha de Carga',
      name: 'loadingDate',
      format: (row: RowType) => {
        const date = new Date(row.loadingDate).toLocaleDateString();
        return <p>{date}</p>;
      },
    },
    { id: 'employee', label: 'Empleado', name: 'employee' },
    { id: 'validatorID', label: 'Id del Validador', name: 'validatorID' },
    { id: 'valid', label: 'Válido', name: 'valid' },
  ];

  const [devicesList, setDevicesList] = useState<RowType[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [optionSearch, setOptionSearch] = useState<string>('');
  const [textSearch, setTextSearch] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentDevice, setCurrentDevice] = useState<Device>();

  const getData = async () => {
    try {
      const response = await getAllDevices();
      updateListDevices(response.data);
    } catch (error) {
      setDevicesList([]);
      setDevices([]);
    }
  };

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setOptionSearch(event.target.value);
  };

  const updateListDevices = (devices: Device[]): void => {
    try {
      setDevicesList(
        devices.map((device) => ({
          validationID: device.validationID,
          imei: device.imei,
          state: device.state,
          supplier: device.supplier,
          score: device.score,
          loadingDate: device.loadingDate,
          employee: device.employee?.name,
          validatorID: device.validatorID,
          valid: device.valid ? 'Válido' : 'Inválido',
        }))
      );
      setDevices(devices);
    } catch (error) {
      setDevicesList([]);
    }
  };

  const handleSearch = async () => {
    if (optionSearch === 'imei') {
      const response = await getDeviceByImei(textSearch);
      updateListDevices([response.data]);
    }
    if (optionSearch === 'supplier') {
      const response = await getDevicesBySupplier(textSearch);
      updateListDevices(response.data);
    }
    if (optionSearch === 'all') {
      getData();
    }
    //Clean search params
    setOptionSearch('');
    setTextSearch('');
  };

  const updateStatus = (row: RowType) => {
    const device = devices.find(
      (device) => device.validationID === row.validationID
    );
    if (device) {
      setCurrentDevice(device);
      setOpenModal(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {openModal && (
        <ModalComponent
          openModal={openModal}
          setOpenModal={setOpenModal}
          size="small"
        >
          <UpdateState setOpenModal={setOpenModal} device={currentDevice} />
        </ModalComponent>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} columns={12} alignItems="center">
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="inputSearch-label">
                    Criterio de búsqueda
                  </InputLabel>
                  <Select
                    labelId="inputSearch-label"
                    id="inputSearch"
                    value={optionSearch}
                    label="Búsqueda"
                    onChange={handleChangeSearch}
                  >
                    <MenuItem value={'all'}>Ver todos</MenuItem>
                    <MenuItem value={'imei'}>Imei</MenuItem>
                    <MenuItem value={'supplier'}>Proveedor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Imei o Proveedor"
                  variant="outlined"
                  onChange={(e) => setTextSearch(e.target.value)}
                  value={textSearch}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={(optionSearch === '' || textSearch === '') && !(optionSearch === 'all')}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" margin="2">
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Lista de dispositivos
              </Typography>
            </Box>
            <TableComponent<RowType>
              columns={columnsDevices}
              rows={devicesList}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Devices;

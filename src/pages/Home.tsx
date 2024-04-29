import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../routes/Routes';
import { uploadFile } from '../services/file';

const Home = () => {
  const [file, setFile] = useState<File>();
  const { setAlert } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    if (!file) {
      setAlert({
        open: true,
        message: 'Debes seleccionar un archivo',
        type: 'error',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await uploadFile(file);
      if (response.data) {
        setAlert({
          open: true,
          message: 'Archivo cargado correctamente',
          type: 'success',
        });
      } else {
        setAlert({
          open: true,
          message: 'Error al cargar el archivo',
          type: 'error',
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error al cargar el archivo',
        type: 'error',
      });
    }
    setLoading(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(undefined);
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file.type === 'text/csv') {
        setFile(file);
      } else {
        setAlert({
          open: true,
          message: 'El archivo debe ser de tipo CSV',
          type: 'error',
        });
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Validación de Dispositivos
          </Typography>
          <Box>
            <Typography component="p" variant="body1" gutterBottom>
              Sube el archivo de dispositivos a validar
            </Typography>
            <Button variant="contained" component="label">
              <img
                alt="upload-file"
                src="../images/upload-file.png"
                className="btn__upload"
                role="button"
              />
              Buscar archivo
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => {
                  handleChangeInput(e);
                }}
              />
            </Button>
            <Typography component="p" variant="body1" gutterBottom>
              {file?.name}
            </Typography>
            {loading && <CircularProgress />}
            {file && (
              <Button
                variant="contained"
                color="success"
                onClick={handleValidate}
                disabled={loading}
              >
                Validar
              </Button>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;

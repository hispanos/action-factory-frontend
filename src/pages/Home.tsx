import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../routes/Routes';
import { validateFile } from '../services/validate';

const Home = () => {
  const [file, setFile] = useState<File>();
  const { setAlert } = useContext(AppContext);

  const handleValidate = async () => {
    if (!file) {
      setAlert({
        open: true,
        message: 'Debes seleccionar un archivo',
        type: 'error',
      });
      return;
    }
    const response = await validateFile(file);
    if (response.data) {
      setAlert({
        open: true,
        message: 'El archivo es válido',
        type: 'success',
      });
    } else {
      setAlert({
        open: true,
        message: 'El archivo no es válido',
        type: 'error',
      });
    }
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
            {file && (
              <Button
                variant="contained"
                color="success"
                onClick={handleValidate}
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

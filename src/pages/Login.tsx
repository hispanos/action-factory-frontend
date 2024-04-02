import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../components/InputText';
import { login } from '../services/authentication';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const { setIsLogged, setUser, isLogged } = useContext(AppContext);
  const [errorLogin, setErrorLogin] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorLogin(false);
    const response = await login(data.email, data.password);
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsLogged(true);
      navigate('/');
    }else {
      setErrorLogin(true);
    }
  };

  useEffect(() => {
    if(isLogged) {
        navigate('/')
    }
  }, [isLogged])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Action Factory
          </Typography>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputText
              type="text"
              name="email"
              control={control}
              label="Correo electrónico"
              required
              errors={errors}
            />
            <InputText
              type="password"
              name="password"
              control={control}
              label="Contraseña"
              required
              errors={errors}
            />
            {
              errorLogin &&
              <Alert severity="error">Usuario o contraseña incorrectos.</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../services/authentication';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';
import Loginn from './Loginn'; 
 

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
    } else {
      setErrorLogin(true);
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [isLogged])

  return (
    <Loginn /> 
  );
};

export default Login;
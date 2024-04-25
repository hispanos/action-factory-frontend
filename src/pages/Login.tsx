import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../services/authentication';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';
import { Alert } from '@mui/material';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const { setIsLogged, setUser, isLogged } = useContext(AppContext);
  const [errorLogin, setErrorLogin] = useState(false);
  const secondTextRef = useRef<HTMLInputElement>(null);

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

  const textLoad = () => {
    setTimeout(() => {
      if (secondTextRef.current) {
        secondTextRef.current.textContent = 'Validación Simplificada';
      }
    }, 0);
    setTimeout(() => {
      if (secondTextRef.current) {
        secondTextRef.current.textContent = 'Hacemos el Trabajo Pesado';
      }
    }, 4000);
    setTimeout(() => {
      if (secondTextRef.current) {
        secondTextRef.current.textContent = 'Tu Socio Confiable :)';
      }
    }, 8000);
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged]);

  useEffect(() => {
    textLoad();
    setInterval(textLoad, 12000);
  }, []);

  return (
    <div className="login__container">
      <div className="heroki">
        <div className="box-1">
          <div className="conteiner">
            <h1 className="title">Action Factory</h1>
            <h3 className="text second-text" ref={secondTextRef}>
              Validación de dispositivos
            </h3>
          </div>
        </div>
        <div className="box-2">
          <div className="hero">
            <div className="main">
              <input type="checkbox" id="chk" aria-hidden="true" />
              <div className="login">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  {errorLogin && (
                    <Alert severity="error" className="form__alert">
                      Usuario o contraseña incorrectos.
                    </Alert>
                  )}
                  <label htmlFor="chk" aria-hidden="true">
                    Ingresar
                  </label>
                  <input
                    className={`input ${errors.email ? 'border__error' : ''}`}
                    type="email"
                    placeholder="Correo electrónico"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span className="input__error">
                      Este campo es obligatorio
                    </span>
                  )}
                  <input
                    className={`input ${
                      errors.password ? 'border__error' : ''
                    }`}
                    type="password"
                    placeholder="Contraseña"
                    {...register('password', { required: true })}
                  />
                  {errors.password && (
                    <span className="input__error">
                      Este campo es obligatorio
                    </span>
                  )}
                  <button>Log in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

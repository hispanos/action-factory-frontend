import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivatedRoutes from './PrivatedRoutes';
import Suppliers from '../pages/Suppliers';
import { createContext, useEffect, useState } from 'react';
import { User } from '../interfaces/User';

export type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  loadingLogin: boolean;
};

export const AppContext = createContext<UserContextType>({
  setUser: () => {},
  setIsLogged: () => {},
  isLogged: false,
  user: undefined,
  loadingLogin: false,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivatedRoutes />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/suppliers', element: <Suppliers /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const Routes = () => {
  const [user, setUser] = useState<User>();
  const [isLogged, setIsLogged] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }else {
      setIsLogged(false);
    }
    setLoadingLogin(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        loadingLogin,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default Routes;

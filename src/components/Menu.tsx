import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { LocalShipping } from '@mui/icons-material';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';

const MainListItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const menuElements = [
    {
      path: '/',
      label: 'Validación',
      icon: <DashboardIcon />,
    },
    {
      path: '/devices',
      label: 'Dispositivos',
      icon: <ImportantDevicesIcon />,
    },
    {
      path: '/suppliers',
      label: 'Proveedores',
      icon: <LocalShipping />,
    },
    {
      path: '/employees',
      label: 'Empleados',
      icon: <PeopleIcon />,
    },
  ];

  return (
    <React.Fragment>
      {menuElements.map((element) => (
        <ListItemButton
          key={element.path}
          onClick={() => {
            handleNavigate(element.path);
          }}
        >
          <ListItemIcon>{element.icon}</ListItemIcon>
          <ListItemText primary={element.label} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default MainListItems;

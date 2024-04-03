import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const MainListItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          handleNavigate('/');
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Validación" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          handleNavigate('/suppliers');
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Proveedores" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;

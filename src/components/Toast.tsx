import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../routes/Routes';

const Toast = () => {
  const {
    setAlert,
    alert: { message, open, type },
  } = useContext(AppContext);

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

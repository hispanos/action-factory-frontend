import { Alert, Snackbar } from '@mui/material';

const Toast = ({
  open,
  setOpen,
  type,
  message,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}) => {
  const handleClose = () => {
    setOpen(false);
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

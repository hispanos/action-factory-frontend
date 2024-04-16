import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  createTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Toast from '../components/Toast';

const defaultTheme = createTheme();

const Dashboard = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toast/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

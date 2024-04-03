import { Grid, Paper, Typography } from '@mui/material';
import TableComponent from '../components/TableComponent';
import { Columns, Rows } from '../interfaces/Table';

const Suppliers = () => {
  const columnsSupplier: Columns = [
    { id: 'name', label: 'Nombre', name: 'name', minWidth: 170 },
    { id: 'address', label: 'Dirección', name: 'address', minWidth: 170 },
    { id: 'phone', label: 'Teléfono', name: 'phone', minWidth: 100 },
    { id: 'email', label: 'Email', name: 'email', minWidth: 170 },
    { id: 'site_web', label: 'Sitio Web', name: 'site_web', minWidth: 170 },
    { id: 'industry', label: 'Industria', name: 'industry', minWidth: 170 },
    {
      id: 'date_registered',
      label: 'Fecha de Registro',
      name: 'date_registered',
      minWidth: 170,
    },
  ];

  type Supplier = {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    site_web: string;
    industry: string;
    date_registered: string;
  };

  const rows: Rows<Supplier> = [
    {
      id: 1,
      name: 'Proveedor 1',
      address: 'Calle 123',
      phone: '123456789',
      email: 'uncorreo@example.com',
      site_web: 'www.example.com',
      industry: 'Industria 1',
      date_registered: '2021-10-10',
    },
    {
      id: 2,
      name: 'Proveedor 2',
      address: 'Calle 123',
      phone: '123456789',
      email: 'uncorreo@example.com',
      site_web: 'www.example.com',
      industry: 'Industria 1',
      date_registered: '2021-10-10',
    },
    {
      id: 3,
      name: 'Proveedor 2',
      address: 'Calle 123',
      phone: '123456789',
      email: 'uncorreo@example.com',
      site_web: 'www.example.com',
      industry: 'Industria 1',
      date_registered: '2021-10-10',
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Proveedores
          </Typography>
          <TableComponent<Supplier> columns={columnsSupplier} rows={rows} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Suppliers;

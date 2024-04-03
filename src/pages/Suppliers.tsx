import { Grid, Paper, Typography } from '@mui/material';
import TableComponent from '../components/TableComponent';
import { Columns, Rows } from '../interfaces/Table';

const Suppliers = () => {

  const columns: Columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'phone', label: 'Teléfono', minWidth: 100 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 100 },
    { id: 'address', label: 'Dirección', minWidth: 100 },
    { id: 'city', label: 'Ciudad', minWidth: 100 },
    { id: 'state', label: 'Estado', minWidth: 100 },
    { id: 'zip', label: 'Código Postal', minWidth: 100 },
  ]

  type Supplier = {
    id: number;
    name: string;
    phone: string;
    email: string;
  }

  const rows: Rows<Supplier> = [
    {
      id: 1,
      name: 'Proveedor 1',
      phone: '1234567890',
      email: 'proveedor@gmail.com',
    }
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Proveedores
          </Typography>
          <TableComponent<Supplier> columns={columns} rows={rows} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Suppliers;

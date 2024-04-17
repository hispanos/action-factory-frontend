import { useEffect, useState } from 'react';
import { Employee } from '../interfaces/Employee';
import { Columns, RowType } from '../interfaces/Table';
import { getEmployees } from '../services/employee';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import TableComponent from '../components/TableComponent';
import EditIcon from '@mui/icons-material/Edit';
import ModalComponent from '../components/ModalComponent';
import FormEmployee from '../components/FormEmployee';

const Employees = () => {
  const columnsEmployees: Columns<RowType> = [
    { id: 'id', label: 'Id', name: 'id' },
    { id: 'name', label: 'Nombre', name: 'name' },
    { id: 'email', label: 'Email', name: 'email' },
    { id: 'role', label: 'Rol', name: 'role' },
    { id: 'hiringDate', label: 'Fecha de Contratación', name: 'hiringDate' },
    { id: 'lastAccess', label: 'Último Acceso', name: 'lastAccess' },
    { id: 'state', label: 'Estado', name: 'state' },
    {
      id: 'actions',
      label: 'Acciones',
      name: 'actions',
      format: (row: RowType) => {
        return (
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => editEmployee(row)}
            >
              <EditIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesRow, setEmployeesRow] = useState<RowType[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [reload]);

  const getData = async () => {
    const response = await getEmployees();
    if (response?.data) {
      setEmployees(response.data);
      //Set employesRow with structure of RowType with all employees rows
      setEmployeesRow(
        response.data.map((employee) => ({
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role.name,
          hiringDate: employee.hiringDate,
          lastAccess: employee.lastAccess,
          state: employee.state,
        }))
      );
    } else {
      setEmployees([]);
    }
  };

  const newEmployee = () => {
    setIsEdit(false);
    setOpenModal(true);
  };

  const editEmployee = (row: RowType) => {
    const employee = employees.find((employee) => employee.id === row.id);
    if (employee) {
      setIsEdit(true);
      setCurrentEmployee(employee);
      setOpenModal(true);
    }
  };

  const doRefresh = () => {
    setReload(!reload);
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
          <FormEmployee
            doRefresh={doRefresh}
            isEdit={isEdit}
            employee={currentEmployee}
          />
        </ModalComponent>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" margin="2">
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Empleados
              </Typography>
              <Button variant="contained" onClick={newEmployee}>
                Nuevo
              </Button>
            </Box>
            <TableComponent<RowType>
              columns={columnsEmployees}
              rows={employeesRow}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Employees;

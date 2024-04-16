import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Columns, RowType, Rows } from '../interfaces/Table';

const TableComponent = <T extends RowType>({
  columns,
  rows,
}: {
  columns: Columns<T>;
  rows: Rows<T>;
}) => {
  return (
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, index2) => {
                if (column.format) {
                  return (
                    <TableCell key={index2}>
                      {column.format(row)}
                    </TableCell>
                  );
                }
                return <TableCell key={index2}>{row[column.name]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

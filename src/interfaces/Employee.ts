export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  hiringDate: string; // asumimos que es una cadena en formato de fecha
  lastAccess: string; // también asumimos que es una cadena en formato de fecha y hora
  state: StatusEmployee;
}

interface Role {
  id: number;
  name: RoleName;
  description: string;
}

enum RoleName {
  VALIDADOR = 'VALIDADOR',
  COORDINADOR = 'COORDINADOR',
}

enum StatusEmployee {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

//Crear un type FormEmployee similar a employee sin el id y el campo role debe ser string
export type FormEmployee = Omit<Employee, 'id' | 'role' | 'lastAccess'> & { role: string };
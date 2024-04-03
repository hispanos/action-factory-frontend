export type Columns = Column[];
export type Column = {
  id: string;
  label: string;
  name: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
};

export type Rows<R extends RowType> = R[];

export type RowType = {
  [key: string]: string | number;
};

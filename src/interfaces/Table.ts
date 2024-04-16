export type Columns<T> = Column<T>[];
export type Column<T> = {
  id: string;
  label: string;
  name: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (element: T) => JSX.Element;
};

export type Rows<R extends RowType> = R[];

export type RowType = {
  [key: string]: string | number;
};

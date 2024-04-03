export type Columns = Column[];
export type Column = {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
};

export type Rows<R> = R[];
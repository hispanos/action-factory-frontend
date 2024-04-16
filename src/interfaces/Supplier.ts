export type Supplier = {
    id: number;
    name: string;
    address: string;
    telephoneNumber: string;
    email: string;
    webSite: string;
    sectorIndustry: string;
    registrationDate: string;
  };

export type FormSupplier = Omit<Supplier, 'id'>
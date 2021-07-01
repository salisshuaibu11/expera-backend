export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resourse: any) => Promise<any>;
  putById: (id: string, resourse: any) => Promise<any>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
}

export type DB_Response<T> = {
  status: number;
  message: string;
  error?: any;
  data?: T;
};

export type Route = {
  method: string;
  route: string;
  controller: object;
  action: string;
};

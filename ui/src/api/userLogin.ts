import axios, { AxiosResponse } from 'axios';
import { DB } from './';
import { DB_Response } from '../consts';

export default async function userLogin(
  login: string,
  password: string
): Promise<DB_Response<boolean>> {
  return await axios
    .post(`http://${DB.PATH}:${DB.PORT}/login`, { login, password })
    .then(({ data }: AxiosResponse<DB_Response<boolean>, any>) => {
      if (data.status !== 200) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

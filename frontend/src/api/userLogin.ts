import axios, { AxiosResponse } from 'axios';
import { DB } from './';
import { DB_Response } from '../consts';

export default async function userLogin(
  login: string,
  password: string
): Promise<boolean | undefined> {
  return await axios
    .post(`http://${DB.PATH}:${DB.PORT}/validate`, { login, password })
    .then(({ data }: AxiosResponse<DB_Response, any>) => {
      if (data.status === 300) throw new Error(data.error);
      if (data.status === 400) throw new Error(data.error);
      if (data.status !== 200) throw new Error(data.error);

      return data.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

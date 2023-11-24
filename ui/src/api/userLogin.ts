import axios, { AxiosResponse } from 'axios';
import { SERVER_CONFIG } from '@ecommerce/shared/types';
import { DB_Response } from '@ecommerce/shared/types';

export default async function userLogin(
  login: string,
  password: string
): Promise<DB_Response<boolean>> {
  return await axios
    .post(`${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/login`, {
      login,
      password
    })
    .then(({ data }: AxiosResponse<DB_Response<boolean>, any>) => {
      if (data.status !== 200) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

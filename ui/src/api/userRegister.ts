import axios, { AxiosResponse } from 'axios';
import { DB } from './';
import { DB_Response, DB_User } from '../consts';

export default async function userRegister({
  login,
  password,
  firstName,
  lastName,
  street,
  city,
  state,
  country,
  zip
}: DB_User): Promise<DB_Response<never>> {
  return await axios
    .post(`http://${DB.PATH}:${DB.PORT}/users`, {
      login,
      password,
      firstName,
      lastName,
      street,
      city,
      state,
      country,
      zip
    })
    .then(({ data }: AxiosResponse<DB_Response<never>, any>) => {
      if (data.status !== 201) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

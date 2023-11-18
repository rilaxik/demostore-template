import axios, { AxiosResponse } from 'axios';
import { SERVER_CONFIG, DB_Response, UsersType } from 'shared/types';

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
}: UsersType): Promise<DB_Response<never>> {
  return await axios
    .post(`${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/users`, {
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

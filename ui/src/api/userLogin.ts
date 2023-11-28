import axios, { AxiosResponse } from 'axios';
import {
  SERVER_CONFIG,
  DB_Response,
  UserProfileType,
  UsersLoginType
} from '@ecommerce/shared/types';

export default async function userLogin(
  userObj: UsersLoginType
): Promise<DB_Response<UserProfileType | null>> {
  return await axios
    .post(`${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/login`, userObj)
    .then(({ data }: AxiosResponse<DB_Response<UserProfileType | null>, any>) => {
      if (data.status !== 200) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

import axios, { AxiosResponse } from 'axios';
import { SERVER_CONFIG, DB_Response, ProductType } from '@ecommerce/shared/types';

export async function productsGetAll(searchQuery: string): Promise<DB_Response<ProductType[]>> {
  const url = `${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/products${searchQuery}`;
  return await axios
    .get(url)
    .then(({ data }: AxiosResponse<DB_Response<ProductType[]>, any>) => {
      if (data.status !== 200) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function productsGetMany(ids: string[]): Promise<DB_Response<ProductType[]>> {
  const url = `${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/products/ids`;
  return await axios
    .post(url, ids)
    .then(({ data }: AxiosResponse<DB_Response<ProductType[]>, any>) => {
      if (data.status !== 200) throw new Error(data.message);

      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

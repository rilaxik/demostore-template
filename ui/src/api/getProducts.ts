import axios, { AxiosResponse } from 'axios';
import { SERVER_CONFIG } from '@ecommerce/shared/types';
import { DB_Response } from '@ecommerce/shared/types';
import { ProductType } from '@ecommerce/shared/types';

export default async function getProducts(
  searchQuery: string
): Promise<DB_Response<ProductType[]>> {
  const url = `${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/products${searchQuery}`;
  console.log(url);
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

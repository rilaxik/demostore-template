import axios, { AxiosResponse } from 'axios';
import {
  SERVER_CONFIG,
  type DB_Response,
  CheckoutRawSchema,
  type CheckoutRawType
} from '@ecommerce/shared/types';
import { mapToObject } from '#functions';

export default async function postCheckout(
  checkoutObj: CheckoutRawType
): Promise<DB_Response<never>> {
  if (!CheckoutRawSchema.safeParse(checkoutObj).success)
    return { status: 400, message: 'Provided checkout does not fulfill our requirements' };

  checkoutObj.cart = mapToObject<number>(checkoutObj.cart);

  return await axios
    .post(
      `${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/checkout`,
      checkoutObj
    )
    .then(({ data }: AxiosResponse<DB_Response<never>, any>) => {
      if (data.status !== 201) throw new Error(data.message);

      return data;
    })
    .catch((error: any) => {
      console.log(error);
      return { status: 400, message: error.message, error };
    });
}

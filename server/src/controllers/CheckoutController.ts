import type { Request } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { Checkout, User } from '#entities';
import {
  type DB_Response,
  CheckoutRegisterSchema,
  CheckoutGetSchema,
} from '@ecommerce/shared/types';

export class CheckoutController {
  private checkoutRepository: Repository<Checkout> = AppDataSource.getRepository(Checkout);
  private userRepository: Repository<User> = AppDataSource.getRepository(User);

  async all() // request: Request,
  // response: Response,
  // next: NextFunction
  : Promise<DB_Response<Checkout[]>> {
    const data: Checkout[] = await this.checkoutRepository.find({
      relations: {
        user: true,
      },
    });
    return {
      status: 200,
      message: 'Checkouts found',
      data,
    };
  }

  async one(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<Checkout>> {
    if (!CheckoutGetSchema.safeParse(request.params).success)
      return { status: 400, message: 'Validation failed: invalid parameter provided' };

    const id: string = request.params.id;

    const checkout: Checkout = await this.checkoutRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!checkout) {
      return { status: 404, message: 'User was not found' };
    }

    return {
      status: 200,
      message: 'Found a checkout',
      data: checkout,
    };
  }

  async save(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<never>> {
    if (!CheckoutRegisterSchema.safeParse(request.body).success)
      return { status: 400, message: 'Please fill all the fields' };

    const { cart, discount, customer, billing, isPaid, isCompleted } = request.body;
    const checkout = Object.assign(new Checkout(), {
      cart,
      discount,
      customer,
      billing,
      isPaid,
      isCompleted,
    });

    if (request.body.user) {
      await this.userRepository
        .findOne({
          where: { id: request.body.user },
        })
        .then((user) => {
          checkout.user = user;
        });
    }

    try {
      await this.checkoutRepository.save(checkout);
    } catch (error: any) {
      return { status: 400, message: 'Failed to save checkout', error };
    }

    return {
      status: 201,
      message: 'Checkout created',
    };
  }
}

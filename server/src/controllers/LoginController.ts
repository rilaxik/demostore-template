import type { Request } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

import { User } from '#entities';
import { type DB_Response, UsersLoginSchema, type UserProfileType } from '@ecommerce/shared/types';
import { encryptValidate } from '../functions/encrypt';

export class LoginController {
  private userRepository: Repository<User> = AppDataSource.getRepository(User);

  async one(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<UserProfileType | null>> {
    if (!UsersLoginSchema.safeParse(request.body).success)
      return { status: 400, message: 'Please fill all the fields' };

    const { email, password } = request.body;

    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();

    if (!user) return { status: 404, message: 'User was not found' };

    const canLogin: boolean = encryptValidate(password, user.password);

    return {
      status: 200,
      message: canLogin ? 'Logging in..' : 'Password is wrong',
      data: canLogin ? user : null,
    };
  }
}

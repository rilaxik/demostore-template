import type { Request } from 'express';
import { Repository } from 'typeorm';
import { type DB_Response, UsersLoginSchema, type UserProfileType } from '@ecommerce/shared/types';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
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

    const { login, password } = request.body;

    const user: User & UserProfileType = await this.userRepository
      .createQueryBuilder('user')
      .where({ login })
      .getOne();

    if (!user) return { status: 404, message: 'User was not found' };

    const canLogin: boolean = encryptValidate(password, user.password);

    return {
      status: 200,
      message: 'Found a user',
      data: canLogin ? user : null,
    };
  }
}

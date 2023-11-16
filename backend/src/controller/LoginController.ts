import type { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import type { DBResponse } from '../types';
import { UsersLoginSchema } from '../types/users';
import { encryptValidate } from '../functions/encrypt';
import { Repository } from 'typeorm';

export class LoginController {
  private userRepository: Repository<User> = AppDataSource.getRepository(User);

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<DBResponse<boolean>> {
    if (!UsersLoginSchema.safeParse(request.body).success)
      return { status: 400, message: 'Validation failed: invalid fields provided' };

    const { login, password } = request.body;

    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.password'])
      .where({ login })
      .getOne();

    if (!user) return { status: 404, message: 'User was not found' };

    let canLogin: boolean = encryptValidate(password, user.password);

    return {
      status: 200,
      message: 'Found a user',
      data: canLogin,
    };
  }
}

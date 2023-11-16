import type { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import type { DBResponse } from '../types';
import { UsersGetOneSchema, UsersSaveSchema, type UsersSaveType } from '../types/users';
import { encrypt } from '../functions/encrypt';
import { Repository } from 'typeorm';

export class UserController {
  private userRepository: Repository<User> = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction): Promise<DBResponse<User[]>> {
    const data: User[] = await this.userRepository.find();
    return {
      status: 200,
      message: 'Users found',
      data,
    };
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<DBResponse<User>> {
    if (!UsersGetOneSchema.safeParse(request.params).success)
      return { status: 400, message: 'Validation failed: invalid fields provided' };

    const login: string = request.params.login;

    const user: User = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) {
      return { status: 404, message: 'User was not found' };
    }

    return {
      status: 200,
      message: 'Found a user',
      data: user,
    };
  }

  async save(request: Request, response: Response, next: NextFunction): Promise<DBResponse<never>> {
    try {
      UsersSaveSchema.parse(request.body);
    } catch (err) {
      const error = err.issues[0];
      if (error.code === 'too_small') {
        return {
          status: 400,
          message: error.message,
          error: error,
        };
      } else if (error.code === 'invalid_type') {
        return {
          status: 400,
          message: `Please fill all the fields`,
          error,
        };
      } else {
        console.log(error);
        return {
          status: 400,
          message: `Unknown Zod Error`,
          error,
        };
      }
    }

    const { login, password, firstName, lastName, street, city, state, country, zip } =
      request.body;

    const passwordEnc: string = encrypt(password);
    const user: User & UsersSaveType = Object.assign(new User(), {
      login,
      password: passwordEnc,
      firstName,
      lastName,
      street,
      city,
      state,
      country,
      zip,
    });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.errno === 19) {
        return { status: 400, message: 'User already exists' };
      } else return undefined;
    }

    return { status: 201, message: 'User was successfully saved' };
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<DBResponse<never>> {
    const id: number = parseInt(request.params.id);

    let userToRemove: User = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return { status: 404, message: 'This user does not exist' };
    }

    await this.userRepository.remove(userToRemove);

    return { status: 200, message: 'User has been removed' };
  }
}

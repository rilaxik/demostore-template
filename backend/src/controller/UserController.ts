import { AppDataSource } from '../data-source';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { encrypt } from '../functions/encrypt';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const data = await this.userRepository.find();
    return {
      status: 200,
      data,
    };
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const login = request.params.login;

    const user = await this.userRepository.findOne({
      where: { login },
    });

    // todo part of login system
    // const pass = await this.userRepository
    //   .createQueryBuilder("user")
    //   .select(["user.login", "user.password"])
    //   .where({ login: "admin" })
    //   .getOne();
    //
    // console.log(pass);

    if (!user) {
      return { status: 400, message: 'User was not found' };
    }

    return {
      status: 200,
      data: user,
    };
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { login, password, firstName, lastName, street, city, state, country, zip } =
      request.body;

    const passwordEnc = encrypt(password);

    const user = Object.assign(new User(), {
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

    let data;
    try {
      data = await this.userRepository.save(user);
    } catch (e) {
      if (e.errno === 19) {
        return { status: 400, message: 'User already exists' };
      } else return undefined;
    }

    return { status: 201, data };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return { status: 404, message: 'This user does not exist' };
    }

    await this.userRepository.remove(userToRemove);

    return { status: 200, message: 'User has been removed' };
  }
}

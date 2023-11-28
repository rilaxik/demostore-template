import { Request } from 'express';
import { Repository, In } from 'typeorm';
import { AppDataSource } from '../data-source';

import { Product } from '#entities';
import {
  type DB_Response,
  ProductGetManySchema,
  ProductRegisterSchema,
  ShopQuerySchema,
} from '@ecommerce/shared/types';

export class ProductController {
  private productRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async all(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<Product[]>> {
    if (Object.keys(request.query).length) {
      try {
        ShopQuerySchema.parse(request.query);
      } catch (err) {
        const data: Product[] = await this.productRepository.find();
        return {
          status: 200,
          message: 'No category found',
          data,
        };
      }

      const { query, category } = request.query;
      const data = this.productRepository.createQueryBuilder('p');

      if (Object.keys(request.query).length === 1) {
        data.where(
          `p.tags LIKE "%${category ?? query}%" 
          OR p.name LIKE "%${category ?? query}%" 
          OR p.material LIKE "%${category ?? query}%"`
        );
      } else {
        data.where(
          `p.tags LIKE "%${category}%" AND (p.tags LIKE "%${query}%" OR p.name LIKE "%${query}%" OR p.material LIKE "%${query}%")`
        );
      }

      return {
        status: 200,
        message: 'Specific products found',
        data: await data.getMany(),
      };
    }

    const data: Product[] = await this.productRepository.find();
    return {
      status: 200,
      message: 'Products found',
      data,
    };
  }

  async many(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<Product[]>> {
    if (!ProductGetManySchema.safeParse(request.body).success)
      return { status: 400, message: 'Validation failed: body is not an array of UUIDs' };

    const ids: string[] = request.body;

    const products: Product[] = await this.productRepository.find({
      where: {
        id: In(ids),
      },
    });

    // await Promise.all(
    //   ids.map(async (id: string) => {
    //     await this.productRepository
    //       .createQueryBuilder('p')
    //       .where({ id })
    //       .getOne()
    //       .then((product: Product) => products.push(product));
    //   })
    // );

    if (!products || !products.length) {
      return { status: 404, message: 'Products were not found' };
    }

    return {
      status: 200,
      message: 'Found some products',
      data: products,
    };
  }

  async save(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<never>> {
    try {
      ProductRegisterSchema.parse(request.body);
    } catch (err) {
      return {
        status: 400,
        message: 'Required fields do not match',
        error: err.issues,
      };
    }

    const product = Object.assign(new Product(), request.body);

    try {
      await this.productRepository.save(product);
    } catch (e) {
      if (e.errno === 19) {
        return { status: 400, message: 'Product already exists' };
      } else return undefined;
    }

    return { status: 201, message: 'Product was successfully saved' };
  }

  async remove(
    request: Request
    // response: Response,
    // next: NextFunction
  ): Promise<DB_Response<never>> {
    const id: string = request.params.id;

    if (!id) {
      return { status: 404, message: 'Invalid query provided' };
    }

    let productToRemove: Product = await this.productRepository.findOneBy({ id });

    if (!productToRemove) {
      return { status: 404, message: 'This product does not exist' };
    }

    await this.productRepository.remove(productToRemove);

    return { status: 200, message: 'Product has been removed' };
  }
}

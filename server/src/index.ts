import express from 'express';
import type { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { zodMW } from './middlewares/zod.middleware';
import chalk from 'chalk';

import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { SERVER_CONFIG, Route } from '@ecommerce/shared/types';

// todo proper error handling, frontend error handling
AppDataSource.initialize()
  .then(async (): Promise<void> => {
    /*
     *   create express app
     *   use middlewares
     */
    const app: Express = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(zodMW);

    /*
     *   register express routes from defined application routes
     */

    Routes.forEach((route: Route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);

        /*
         *   controller return handler
         */
        if (result instanceof Promise) {
          result.then((result): void =>
            result !== null && result !== undefined
              ? res.send(result) &&
                console.log(
                  `✔️ | ${chalk.bold(
                    result.status
                  )} | Handled ${route.method.toUpperCase()} request`
                )
              : res.json({
                  status: 500,
                  message: 'DB: could not resolve',
                }) && console.log(chalk.red(`❌ | Failed ${route.method.toUpperCase()} request`))
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
          console.log(
            `✔️ | ${chalk.bold(result.status)} | Handled ${route.method.toUpperCase()} request`
          );
        } else {
          res.json({ status: 500, message: 'DB: could not resolve' });
          console.log(chalk.red(`❌ | Failed ${route.method.toUpperCase()} request`));
        }
      });
    });

    /*
     *   default path response
     */
    app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Server is alive' });
    });

    /*
     *   start express server
     */
    app.listen(SERVER_CONFIG.PORT);

    console.log(
      chalk.bold(`
🌎 | Server started on ${SERVER_CONFIG.PROTO}://${SERVER_CONFIG.PATH}:${SERVER_CONFIG.PORT}/`)
    );
  })
  .catch((error) => console.log(error));

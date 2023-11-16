import * as express from 'express';
import type { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { zodMW } from './middlewares/zod.middleware';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { Route } from './types';

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
                console.log(`✔️| ${result.status} | Handled ${route.method.toUpperCase()} request`)
              : res.json({
                  status: 500,
                  message: 'DB: could not resolve',
                }) && console.log(`❌| Failed ${route.method.toUpperCase()} request`)
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
          console.log(`✔️| ${result.status} | Handled ${route.method.toUpperCase()} request`);
        } else {
          res.json({ status: 500, message: 'DB: could not resolve' });
          console.log(`❌| Failed ${route.method.toUpperCase()} request`);
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
    app.listen(3001);

    console.log('🌎| Server started on http://localhost:3001/');
  })
  .catch((error) => console.log(error));

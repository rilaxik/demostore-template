import { DB_Response, Route } from "./request";
import {
  UsersGetSchema,
  UsersRegisterSchema,
  type UsersType,
  UsersLoginSchema,
} from "./users";

const SERVER_CONFIG: any = {
  PROTO: "http",
  PATH: "localhost",
  PORT: 3001,
};

export {
  SERVER_CONFIG,
  DB_Response,
  Route,
  UsersGetSchema,
  UsersRegisterSchema,
  type UsersType,
  UsersLoginSchema,
};

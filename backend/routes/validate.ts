import express, { Router, Request, Response } from "express";
import sqlite from "sqlite3";
import { encryptValidate } from "../functions/encrypt.js";

const validateRouter: Router = express.Router();

let sql: string;
let passwordMatch: boolean;
let db: sqlite.Database;

validateRouter.post(
  "/validate",
  (req: Request, res: Response): Response | undefined => {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res.json({
          status: 400,
          success: false,
          error: "Please fill all the fields",
        });
      }

      sql = `SELECT * FROM users WHERE login = ?`;

      db = new sqlite.Database(
        "./users.db",
        sqlite.verbose().OPEN_READWRITE,
        (err: Error | null) => {
          if (err) console.log(err);
        },
      );

      db.all(
        sql,
        [login],
        (err: Error | null, rows: DB_User[] | []): Response => {
          if (err)
            return res.json({
              status: 300,
              success: false,
              error: err,
            });

          if (rows.length < 1)
            return res.json({
              status: 300,
              success: false,
              error: "User was not found",
            });

          passwordMatch = encryptValidate(password, rows[0].password);
          return res.json({ status: 200, success: true, data: passwordMatch });
        },
      );
    } catch (err: any) {
      console.error(err.message ?? "No error message");
      return res.json({
        status: 400,
        success: false,
      });
    }
  },
);

export default validateRouter;

type DB_User = {
  ID: number;
  login: string;
  password: string;
};

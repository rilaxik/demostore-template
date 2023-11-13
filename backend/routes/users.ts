import express, { Router, Request, Response } from "express";
import sqlite, { RunResult } from "sqlite3";
import url from "url";
import { ParsedUrlQuery } from "querystring";
import { encrypt } from "../functions/encrypt.js";

const usersRouter: Router = express.Router();

let sql: string;
let db: sqlite.Database;

usersRouter.post("/users", (req: Request, res: Response) => {
  try {
    const {
      login,
      password,
      firstName,
      lastName,
      street,
      city,
      state,
      country,
      zip,
    } = req.body;
    if (
      !login ||
      !password ||
      !firstName ||
      !lastName ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zip
    ) {
      return res.json({
        status: 400,
        success: false,
        error: "Please fill all the fields",
      });
    }
    if (login.length < 5) {
      return res.json({
        status: 300,
        success: false,
        error: "Login must be at least 5 symbols long",
      });
    }
    if (password.length < 8) {
      return res.json({
        status: 300,
        success: false,
        error: "Password must be at least 8 symbols long",
      });
    }

    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    sql = `INSERT INTO users(login, password, firstName, lastName, street, city, state, country, zip) VALUES (?,?,?,?,?,?,?,?,?)`;

    db.run(
      sql,
      [
        login,
        encrypt(password),
        firstName,
        lastName,
        street,
        city,
        state,
        country,
        zip,
      ],
      (err: Error | null) => {
        if (err)
          return res.json({
            status: 300,
            success: false,
            error: "User already exists",
          });
        console.log("Successful POST request, new user added:", req.body);
        res.json({
          status: 200,
          success: true,
          data: true,
        });
      },
    );
  } catch (err: any) {
    console.error(err.message ?? "No error message");
    return res.json({
      status: 400,
      success: false,
      error: err,
    });
  }
});

usersRouter.get("/users", (req: Request, res: Response) => {
  sql = `SELECT * FROM users`;
  try {
    const queryObj = url.parse(req.url, true).query;
    if (queryObj && queryObj.login) {
      sql += ` WHERE login = ?`;
    }

    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    db.all(
      sql,
      [queryObj.login],
      (
        err: Error | null,
        rows: (DB_User & { password?: string })[],
      ): Response<DB_Response> => {
        if (err)
          return res.json({
            status: 300,
            success: false,
            error: err,
          });
        if (rows.length < 1)
          return res.json({
            status: 200,
            success: false,
            error: "No match",
          });

        const rowsSecure: DB_User[] = [];
        rows.forEach((item) => {
          delete item.password;
          rowsSecure.push(item);
        });

        console.log("Successful GET request:", url.parse(req.url, true).href);
        return res.json({ status: 200, success: true, data: rowsSecure });
      },
    );
  } catch (err: any) {
    console.error(err.message);
    return res.json({
      status: 400,
      success: false,
    });
  }
});

usersRouter.delete("/users", (req: Request, res: Response) => {
  sql = "DELETE FROM users WHERE ID = ?";
  try {
    const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;
    if (!queryObj || !queryObj.id) {
      return res.json({
        status: 400,
        success: false,
        error: "Please fill all the fields",
      });
    }

    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    db.run(sql, [queryObj.id], (_: RunResult, err: Error | null): Response => {
      if (err)
        return res.json({
          status: 300,
          success: false,
          error: err,
        });
      console.log("Successful DELETE request:", url.parse(req.url, true).href);
      return res.json({ status: 200, success: true, data: true });
    });
  } catch (err: any) {
    console.error(err.message);
    return res.json({
      status: 400,
      success: false,
    });
  }
});

export default usersRouter;

type DB_Response = {
  status: number;
  success: boolean;
  error?: Error | string;
  data: any;
};
type DB_User = {
  login: string;
  firstName: string;
  lastName: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  state: string;
};

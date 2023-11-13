import express, { Router, Request, Response } from "express";
import sqlite, { RunResult } from "sqlite3";
import url from "url";
import { ParsedUrlQuery } from "querystring";

const usersRouter: Router = express.Router();

let sql: string;
let db: sqlite.Database;

usersRouter.post("/users", (req: Request, res: Response) => {
  try {
    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    const { login, password, street, city, state, country, zip } = req.body;
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
    sql = `INSERT INTO users(login, password, street, city, state, country, zip) VALUES (?,?,?,?,?,?,?)`;

    db.run(
      sql,
      [login, password, street, city, state, country, zip],
      (err: Error | null) => {
        if (err)
          return res.json({
            status: 300,
            success: false,
            error: err,
          });
        console.log("Successful POST request, new user added:", req.body);
      },
    );

    res.json({
      status: 200,
      success: true,
    });
  } catch (err: any) {
    console.error(err.message ?? "No error message");
    return res.json({
      status: 400,
      success: false,
    });
  } finally {
    db.close();
  }
});

usersRouter.get("/users", (req: Request, res: Response) => {
  sql = `SELECT * FROM users`;
  try {
    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    const queryObj = url.parse(req.url, true).query;
    if (queryObj && queryObj.login) {
      sql += ` WHERE login = ?`;
    }

    db.all(
      sql,
      [queryObj.login],
      (err: Error | null, rows): Response<DB_Response> => {
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
            error: "No match",
          });

        console.log("Successful GET request:", url.parse(req.url, true).href);
        return res.json({ status: 200, success: true, data: rows });
      },
    );
  } catch (err: any) {
    console.error(err.message);
    return res.json({
      status: 400,
      success: false,
    });
  } finally {
    db.close();
  }
});

usersRouter.delete("/users", (req: Request, res: Response): Response => {
  sql = "DELETE FROM users";
  try {
    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;

    if (queryObj && queryObj.login) {
      sql += ` WHERE login = ?`;
      console.log(sql);
      db.run(
        sql,
        [queryObj.login],
        (_: RunResult, err: Error | null): Response => {
          if (err)
            return res.json({
              status: 300,
              success: false,
              error: err,
            });

          console.log(
            "Successful DELETE request:",
            url.parse(req.url, true).href,
          );
          return res.json({ status: 200, success: true });
        },
      );
    }
    return res.json({
      status: 400,
      success: false,
      error: "Please fill all the fields",
    });
  } catch (err: any) {
    console.error(err.message);
    return res.json({
      status: 400,
      success: false,
    });
  } finally {
    db.close();
  }
});

export default usersRouter;

type DB_Response = {
  status: number;
  success: boolean;
  error?: Error | string;
  data: any;
};

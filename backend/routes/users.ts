import express, { Router, Request, Response } from "express";
import sqlite, { RunResult } from "sqlite3";
import url from "url";
import { ParsedUrlQuery } from "querystring";

const usersRouter: Router = express.Router();

let sql: string;
let db: sqlite.Database;

usersRouter.post("/users", (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    sql = `INSERT INTO users(login,password) VALUES (?,?)`;

    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    db.run(sql, [login, password], (err: Error | null) => {
      if (err)
        return res.json({
          status: 300,
          success: false,
          error: err,
        });
      console.log("Successful POST request:", req.body);
    });

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

usersRouter.delete("/users", (req: Request, res: Response) => {
  sql = "DELETE FROM users";
  try {
    const queryObj: ParsedUrlQuery = url.parse(req.url, true).query;

    db = new sqlite.Database(
      "./users.db",
      sqlite.verbose().OPEN_READWRITE,
      (err: Error | null) => {
        if (err) console.log(err);
      },
    );

    if (queryObj && queryObj.login) {
      sql += ` WHERE login = ?`;
      console.log(sql);
      db.run(sql, [queryObj.login], (_: RunResult, err: Error | null) => {
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
      });
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

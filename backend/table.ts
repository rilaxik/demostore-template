import sqlite from "sqlite3";

let db: sqlite.Database;

const sql = `CREATE TABLE users(ID INTEGER PRIMARY KEY, login TEXT NOT NULL UNIQUE, password TEXT NOT NULL )`;

try {
  db = new sqlite.Database(
    "./users.db",
    sqlite.verbose().OPEN_READWRITE,
    (err: Error | null) => {
      if (err) console.log(err);
    },
  );

  db.run(sql);
  console.log("Table created");
  db.close();
} catch (err) {
  console.log(err);
}

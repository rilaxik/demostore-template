import sqlite from "sqlite3";

let db: sqlite.Database;

const sql: string = `CREATE TABLE users(ID INTEGER PRIMARY KEY, login TEXT NOT NULL, password TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, street TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, country TEXT NOT NULL, zip TEXT NOT NULL, UNIQUE(login))`;

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

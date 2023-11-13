const path = require("path");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(
  path.resolve(__dirname, "users.db"),
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) console.log(err);
  },
);

const sql = `CREATE TABLE users(ID INTEGER PRIMARY KEY, login TEXT NOT NULL UNIQUE, password TEXT NOT NULL )`;
db.run(sql).then(() => {
  console.log("Table created");
});

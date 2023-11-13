const express = require('express');
const url = require("url");
const router = express.Router();

const path = require("path");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(
    path.resolve(__dirname, "../users.db"),
    sqlite.OPEN_READWRITE,
    (err) => {
        if (err) console.log(err);
    },
);

let sql;

router.post("/users", (req, res) => {
    try {
        const { login, password } = req.body;
        sql = `INSERT INTO users(login,password) VALUES (?,?)`;

        db.run(sql, [login, password], (err) => {
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
    } catch (err) {
        console.error(err.message);
        return res.json({
            status: 400,
            success: false,
        });
    }
});

router.get('/users', (req, res) => {
    sql = `SELECT * FROM users`;
    try {
        const queryObj = url.parse(req.url, true).query;
        if (queryObj && queryObj.login) {
            sql += ` WHERE login = ?`
        }

        db.all(sql, [queryObj.login], (err, rows) => {
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
        });
    } catch (err) {
        console.error(err.message);
        return res.json({
            status: 400,
            success: false,
        });
    }
});

router.delete('/users', (req, res) => {
    sql = 'DELETE FROM users';
    try {
        const queryObj = url.parse(req.url, true).query;
        if (!queryObj && !queryObj.login) {
            console.error(err.message);
            return res.json({
                status: 400,
                success: false,
                error: 'Please fill all the fields',
            });
        }

        sql += ` WHERE login = ?`;
        console.log(sql)
        db.run(sql, [queryObj.login], (_, err) => {
            if (err)
                return res.json({
                    status: 300,
                    success: false,
                    error: err,
                });

            console.log("Successful DELETE request:", url.parse(req.url, true).href);
            return res.json({ status: 200, success: true });
        });
    } catch (err) {
        console.error(err.message);
        return res.json({
            status: 400,
            success: false,
        });
    }
});

module.exports = router;

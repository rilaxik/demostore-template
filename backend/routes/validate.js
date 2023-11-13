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
const {encryptValidate} = require('../functions/encrypt')

let sql;
let passwordMatch;

router.post('/validate', (req, res) => {
    try {
        const { login, password } = req.body
        if (!req.body || !login || !password) {
            return res.json({
                status: 400,
                success: false,
                error: 'Please fill all the fields',
            });
        }

        sql = `SELECT * FROM users WHERE login = ?`

        db.all(sql, [login], (err, rows) => {
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

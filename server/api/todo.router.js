const HttpStatus = require("http-status-codes");
const express = require('express');
const CONSTANTS = require('../constants');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./todoapp.db');
const todoRouter = express.Router()


todoRouter.get(CONSTANTS.ENDPOINT.TODO, async (req, res) => {

    try {

        const rows = await new Promise((resolve, reject) => {
            db.all("SELECT todoid, title, isdone FROM todos", (error, rows) => {
                if (error) {
                    reject(error);
                }
                rows.forEach((row) => {
                    console.log(row.todoid + " " + row.isdone);
                })
                resolve(rows);
            })
        })

        return res
            .status(HttpStatus.StatusCodes.OK)
            .json({ success: true, data: rows });

    } catch (error) {
        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ success: true, message: error });
    }

});

todoRouter.post(CONSTANTS.ENDPOINT.TODO, async (req, res) => {

    const data = req.body

    try {

        const status = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO todos(title, isdone) VALUES(?, ?)`,
                [data?.Title, data?.IsDone], (_, error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                })
        })

        return res.status(HttpStatus.StatusCodes.CREATED).json({
            success: true
        });

    } catch (error) {
        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ success: true, message: error });
    }
});

todoRouter.put(CONSTANTS.ENDPOINT.TODOID, async (req, res) => {

    const data = req.body
    const { todoid } = req.params;

    try {

        const status = await new Promise((resolve, reject) => {
            db.run(`update todos set title=$title, isdone=$isdone where todoid=$todoid`,
                {
                    $title: data?.title,
                    $isdone: data?.isdone,
                    $todoid: todoid
                }, (_, error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                })
        })

        return res.status(HttpStatus.StatusCodes.OK).json({
            success: true
        });

    } catch (error) {
        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ success: true, message: error });
    }
});

todoRouter.delete(CONSTANTS.ENDPOINT.TODOID, async (req, res) => {

    const { todoid } = req.params;

    try {

        const status = await new Promise((resolve, reject) => {
            db.run(`delete from todos where todoid=$todoid`,
                {
                    $todoid: todoid
                }
                , (_, error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                })
        })


        return res.status(HttpStatus.StatusCodes.OK).json({
            success: true
        });

    } catch (error) {
        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ success: true, message: error });
    }
});

module.exports = todoRouter

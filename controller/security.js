const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../configurations/db-conf');
const generate = require("../security/generate")
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
    const body = req.body;
    mysqlConnection.query("Select * from usuarios where userName = ?", [body.userName], (err, rows, field) => {
        if (!err) {
            let user = rows[0];
            if (user === undefined) {
                return res.status(401).send('user does not exist');
            }

            bcrypt.compare(body.password, user.pass, function (err, result) {
                if (err) {
                    // handle error
                    return res.status(401).send('Login Invalido');
                }
                if (result) {
                    // Send JWT
                    const payload = {
                        id: user.id,
                        userName: user.userName,
                        roleId: user.roleId,
                        idDocente: user.idDocente
                    }
                    const token = generate(payload);
                    return res.status(200).json({ token, user: payload });
                } else {
                    // response is OutgoingMessage object that server response http request
                    return res.status(401).send('Login Invalido');
                }
            });
        } else {
            return res.status(500).send(err);
        }
    });
});

module.exports = router;
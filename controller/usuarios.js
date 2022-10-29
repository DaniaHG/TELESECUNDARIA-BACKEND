const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');
const bcrypt = require("bcrypt");

/*---------------------------------------USUARIOS----------------------------------------*/
/*Get-usuarios*/
router.get('/', (req, res) => {
    console.log('get lista usuarios')
    mysqlConnection.query('SELECT u.id,u.idDocente,d.nombre AS docente,u.userName,u.pass,u.roleId FROM usuarios AS u LEFT JOIN docentes AS d ON u.idDocente=d.id;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-usuarios*/
router.get('/:id', (req, res) => {
    console.log('get usuarios')
    mysqlConnection.query('SELECT u.id,u.idDocente,d.nombre AS docente,u.userName,u.pass,u.roleId FROM usuarios AS u LEFT JOIN docentes AS d ON u.idDocente=d.id WHERE u.id=?;', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-usuarios*/
router.post('/', (req, res) => {
    console.log('Insert usuarios')
    let emp = req.body;
    bcrypt.hash(emp.pass,8,(error,hash)=>{
        if(error) throw error;

        mysqlConnection.query('insert into usuarios (userName, idDocente, pass, roleId) values (?,?,?,?)',
        [emp.userName, emp.idDocente, hash, emp.roleId], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send({ message: "created Successfully" });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
    })
    
});

/*Update-usuarios*/
router.put('/:id', (req, res) => {
    console.log('Update usuarios')
    let emp = req.body;
    bcrypt.hash(emp.pass,8,(error,hash)=>{
        if(error) throw error;

        mysqlConnection.query('update usuarios set userName=?,idDocente=?, pass=?, roleId=? where id=?',
        [emp.userName, emp.idDocente, hash, emp.roleId, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })

    })
    
});
/*Delete-usuarios*/
router.delete('/:id', (req, res) => {
    console.log('Delete usuarios')
    mysqlConnection.query('delete from usuarios where id = ?', [req.params.id], (err, result) => {
        if (!err) {
            console.log(result);
            res.status(202).send({ message: 'Deleted Successfully' });
        } else {
            console.log(err);
            res.send({ err: 'Error' + JSON.stringify(err) });
        }
    })
});

module.exports = router;
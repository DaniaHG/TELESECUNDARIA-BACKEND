const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------ALUMNOS------------------------------------------*/
/*Get-Alumnos*/
router.get('/', (req, res) => {
    console.log('get lista alumnos')
    mysqlConnection.query('Select id, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, status from alumnos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
router.get('/:id', (req, res) => {
    console.log('get alumnos')
    mysqlConnection.query('Select id, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, status from alumnos where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/', (req, res) => {
    console.log('Insert alumnos')
    let emp = req.body;
    console.log(emp);
    mysqlConnection.query('insert into alumnos (nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, status) values (?,?,?,?,?,?)',
        [emp.nombre, emp.fecha_nacimiento, emp.fecha_ingreso, emp.direccion, emp.telefono, emp.status], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send({ message: "created Successfully" });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Update-Persona*/
router.put('/:id', (req, res) => {
    console.log('Update alumnos')
    let emp = req.body;
    mysqlConnection.query('update alumnos set nombre=?, fecha_nacimiento=?, fecha_ingreso=?, direccion=?, telefono=?, status=? where id=?',
        [emp.nombre, emp.fecha_nacimiento, emp.fecha_ingreso, emp.direccion, emp.telefono, emp.status, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Delete-Persona*/
router.delete('/:id', (req, res) => {
    console.log('Delete alumnos')
    mysqlConnection.query('delete from alumnos where id = ?', [req.params.id], (err, result) => {
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
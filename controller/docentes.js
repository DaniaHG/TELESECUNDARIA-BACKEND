const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------DOCENTES------------------------------------------*/
/*Get-Docentes*/
router.get('/', (req, res) => {
    console.log('get lista docentes')
    mysqlConnection.query('Select id, dpi, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, correo, status from docentes', (err, rows, fields) => {
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
    console.log('get docente')
    mysqlConnection.query('Select id, dpi, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, correo, status from docentes where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/', (req, res) => {
    console.log('Insert docentes')
    let emp = req.body;
    console.log(emp);
    mysqlConnection.query('insert into docentes (dpi, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, correo, status) values (?,?,?,?,?,?,?,?)',
        [emp.dpi, emp.nombre, emp.fecha_nacimiento, emp.fecha_ingreso, emp.direccion, emp.telefono, emp.correo, emp.status], (err, result) => {
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
    console.log('Update docentes')
    let emp = req.body;
    mysqlConnection.query('update docentes set dpi=?, nombre=?, fecha_nacimiento=?, fecha_ingreso=?, direccion=?, telefono=?, correo=?, status=? where id=?',
        [emp.dpi, emp.nombre, emp.fecha_nacimiento, emp.fecha_ingreso, emp.direccion, emp.telefono, emp.correo, emp.status, req.params.id], (err, result) => {
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
    console.log('Delete docentes')
    mysqlConnection.query('delete from docentes where id = ?', [req.params.id], (err, result) => {
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
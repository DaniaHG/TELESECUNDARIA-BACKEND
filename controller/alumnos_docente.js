const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------ALUMNOS------------------------------------------*/
/*Get-Alumnos*/
router.get('/', (req, res) => {
    console.log('get lista alumnos')
    mysqlConnection.query('Select id, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, status from alumnos', [req.user.idDocente],(err, rows, fields) => {
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
    mysqlConnection.query('Select id, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, status from alumnos where id = ?', [req.params.id, req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});



module.exports = router;
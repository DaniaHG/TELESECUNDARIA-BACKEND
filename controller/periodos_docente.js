const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------PERIODOS----------------------------------------*/
/*Get-PERIODOS*/

router.get('/', (req, res) => {
    console.log('get lista periodos')
    mysqlConnection.query('Select id, descripcion, ciclo, status, fecha_inicio, fecha_fin from periodos;', [req.user.idDocente],(err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-periodos*/
router.get('/:id', (req, res) => {
    console.log('get periodos')
    mysqlConnection.query('Select id, descripcion, ciclo, status, fecha_inicio, fecha_fin from periodos where id = ?;', [req.params.id, req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});


module.exports = router;
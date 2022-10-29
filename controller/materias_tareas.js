const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------MATERIAS TAREAS----------------------------------------*/
/*Get-materias*/
router.get('/', (req, res) => {
    console.log('get lista materias tareas')
    mysqlConnection.query('select m.id, m.nombre, m.grado, m.seccion, m.status, m.docentes_id, d.nombre as docente from materias m join docentes d on d.id = m.docentes_id WHERE m.docentes_id=?;', [req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});

/*Get-id-materias*/
router.get('/:id', (req, res) => {
    console.log('get materias tareas')
    mysqlConnection.query('select m.id, m.nombre, m.grado, m.seccion, m.status, m.docentes_id, d.nombre as docente from materias m join docentes d on d.id = m.docentes_id  where m.id = ? AND m.docentes_id=?;', [req.params.id, req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});




module.exports = router;
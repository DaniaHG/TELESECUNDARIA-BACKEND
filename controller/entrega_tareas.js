const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------ENTREGA TAREAS----------------------------------------*/
/*Get-ENTREGA TAREAS*/
router.get('/', (req, res) => {
    console.log('get lista ENTREGA TAREAS')
    mysqlConnection.query('select e.id, e.status, e.alumnos_id, a.nombre as alumno, e.tareas_id, t.nombre as tarea, m.nombre as materia, p.descripcion as periodo from entrega_tareas e  join alumnos a on a.id = e.alumnos_id join tareas t on t.id = e.tareas_id join materias m on m.id = t.materias_id join periodos p on p.id = t.periodos_id WHERE m.docentes_id=?;', [req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-ENTREGA TAREAS*/
router.get('/:id', (req, res) => {
    console.log('get ENTREGA TAREAS')
    mysqlConnection.query('select e.id, e.status, e.alumnos_id, a.nombre as alumno, e.tareas_id, t.nombre as tarea, m.nombre as materia, p.descripcion as periodo from entrega_tareas e  join alumnos a on a.id = e.alumnos_id join tareas t on t.id = e.tareas_id join materias m on m.id = t.materias_id join periodos p on p.id = t.periodos_id where e.id = ? AND m.docentes_id=?;', [req.params.id, req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-ENTREGA TAREAS*/
router.post('/', (req, res) => {
    console.log('Insert ENTREGA TAREAS')
    let emp = req.body;
    console.log(emp);
    mysqlConnection.query('INSERT INTO entrega_tareas (status, alumnos_id, tareas_id) VALUES (?, ?, ?);',
        [emp.status, emp.alumnos_id, emp.tareas_id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send({ message: "created Successfully" });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Update-ENTREGA TAREAS*/
router.put('/:id', (req, res) => {
    console.log('Update ENTREGA TAREAS')
    let emp = req.body;
    mysqlConnection.query('UPDATE entrega_tareas SET status = ?, alumnos_id = ?, tareas_id = ? WHERE id = ?;',
        [emp.status, emp.alumnos_id, emp.tareas_id, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Delete-ENTREGA TAREAS*/
router.delete('/:id', (req, res) => {
    console.log('Delete ENTREGA TAREAS')
    mysqlConnection.query('delete from entrega_tareas where id = ?;', [req.params.id], (err, result) => {
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
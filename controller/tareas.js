const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------TAREAS----------------------------------------*/
/*Get-tareas*/
router.get('/', (req, res) => {
    console.log('get lista tareas')
    mysqlConnection.query('select t.id, t.fecha, t.nombre, t.descripcion, t.materias_id, m.nombre as materia, m.grado as grado, m.seccion as seccion, t.periodos_id, p.descripcion as periodo from tareas t  join materias m on m.id = t.materias_id join periodos p on p.id = t.periodos_id WHERE m.docentes_id=?;', [req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-tareas*/
router.get('/:id', (req, res) => {
    console.log('get tareas')
    mysqlConnection.query('select t.id, t.fecha, t.nombre, t.descripcion, t.materias_id, m.nombre as materia, m.grado as grado, m.seccion as seccion, t.periodos_id, p.descripcion as periodo from tareas t  join materias m on m.id = t.materias_id join periodos p on p.id = t.periodos_id  where t.id = ? AND m.docentes_id=?;', [req.params.id, req.user.idDocente], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-tareas*/
router.post('/', (req, res) => {
    console.log('Insert tareas')
    let emp = req.body;
    mysqlConnection.query('INSERT INTO tareas (fecha, nombre, descripcion, materias_id, periodos_id) VALUES (?, ?, ?, ?, ?);',
        [emp.fecha, emp.nombre, emp.descripcion, emp.materias_id, emp.periodos_id], (err, result) => {
            if (!err) {
                console.log(result);
                

            let sql =  ` select m.nombre, m.id as materia_id, t.descripcion, a.nombre, a.id as alumno_id
            from tareas t  join materias m on m.id = t.materias_id 
            join periodos p on p.id = t.periodos_id
            join materia_alumno ma on m.id = ma.materias_id
            join alumnos a on ma.alumnos_id = a.id
            WHERE  t.id = ? and m.docentes_id=?;`

            mysqlConnection.query(sql , [result.insertId, req.user.idDocente], (err, rows, fields) => {
                if (!err) {

                 
                    let values = rows.map(row=> (["Pendiente", 0, row.alumno_id, result.insertId]))

 
                    mysqlConnection.query('INSERT INTO entrega_tareas (status, calificacion, alumnos_id, tareas_id) VALUES ?;', [values], function (err, result) {
                       if (!err) {
                           console.log("Entrega de tareas insertadas: " + result.affectedRows);
                           res.status(201).send("Created successfully")
                       }
                       else{
                           console.error(err)
                           res.send("Error "+ err)
                       }

                    });
                } else {
                    console.log(err);
                    res.send('Error');
                }
            })

            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Update-tareas*/
router.put('/:id', (req, res) => {
    console.log('Update tareas')
    let emp = req.body;
    mysqlConnection.query('UPDATE tareas SET  fecha = ?, nombre = ?, descripcion = ?, materias_id = ?, periodos_id = ? WHERE id = ?;',
        [emp.fecha, emp.nombre, emp.descripcion, emp.materias_id, emp.periodos_id, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Delete-tareas*/
router.delete('/:id', (req, res) => {
    console.log('Delete tareas')
    mysqlConnection.query('delete from tareas where id = ?', [req.params.id], (err, result) => {
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
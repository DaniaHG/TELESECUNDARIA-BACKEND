const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------MATERIAS----------------------------------------*/
/*Get-materias*/
router.get('/', (req, res) => {
    console.log('get lista materias')
    mysqlConnection.query('select m.id, m.nombre, m.grado, m.seccion, m.status, m.docentes_id, d.nombre as docente from materias m join docentes d on d.id = m.docentes_id;', (err, rows, fields) => {
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
    console.log('get materias')
    mysqlConnection.query('select m.id, m.nombre, m.grado, m.seccion, m.status, m.docentes_id, d.nombre as docente from materias m join docentes d on d.id = m.docentes_id where m.id = ?;', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-materias*/
router.post('/', (req, res) => {
    console.log('Insert materias')
    let emp = req.body;
    console.log(emp);
    mysqlConnection.query('insert into materias (nombre, grado, seccion, status, docentes_id) values (?,?,?,?,?)',
        [emp.nombre, emp.grado, emp.seccion, emp.status, emp.docentes_id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send({ message: "created Successfully" });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Update-materias*/
router.put('/:id', (req, res) => {
    console.log('Update materias')
    let emp = req.body;
    mysqlConnection.query('update materias set nombre=?,  grado=?, seccion=?, status=?, docentes_id=? where id=?',
        [emp.nombre, emp.grado, emp.seccion, emp.status, emp.docentes_id, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Delete-materias*/
router.delete('/:id', (req, res) => {
    console.log('Delete materias')
    mysqlConnection.query('delete from materias where id = ?', [req.params.id], (err, result) => {
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
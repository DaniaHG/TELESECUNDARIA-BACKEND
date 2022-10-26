const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------MATERIA DOCENTE----------------------------------------*/
/*Get-materia-docente*/
router.get('/', (req, res) => {
    console.log('get lista materia-docente')
    mysqlConnection.query('select a.id, a.docentes_id, d.nombre as docente, a.materias_id, m.nombre as materia from dte0g8247tlcbkvs.materia_docente a  join dte0g8247tlcbkvs.docentes d on d.id = a.docentes_id join dte0g8247tlcbkvs.materias m on m.id = a.materias_id;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-materias-docente*/
router.get('/:id', (req, res) => {
    console.log('get materia-docente')
    mysqlConnection.query('select a.id, a.docentes_id, d.nombre as docente, a.materias_id, m.nombre as materia from dte0g8247tlcbkvs.materia_docente a  join dte0g8247tlcbkvs.docentes d on d.id = a.docentes_id join dte0g8247tlcbkvs.materias m on m.id = a.materias_id where a.id = ?;', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-materia-docente*/
router.post('/', (req, res) => {
    console.log('Insert materia-docente')
    let emp = req.body;
    console.log(emp);
    mysqlConnection.query('insert into materia_docente (docentes_id, materias_id) values (?,?)',
        [emp.docentes_id, emp.materias_id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send({ message: "created Successfully" });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Update-materia-docente*/
router.put('/:id', (req, res) => {
    console.log('Update materia-docente')
    let emp = req.body;
    mysqlConnection.query('update materia_docente set docentes_id=?, materias_id=? where id=?',
        [emp.docentes_id, emp.materias_id, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send({ message: 'Updated Successfully' });
            } else {
                console.log(err);
                res.send({ err: 'Error' + JSON.stringify(err) });
            }
        })
});

/*Delete-materia-docente*/
router.delete('/:id', (req, res) => {
    console.log('Delete materia-docente')
    mysqlConnection.query('delete from materia_docente where id = ?', [req.params.id], (err, result) => {
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
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------ENTREGA TAREAS----------------------------------------*/
/*Get-ENTREGA TAREAS*/
router.get('/',(req,res)=>{
    console.log('get lista ENTREGA TAREAS')
    mysqlConnection.query('select e.id, e.status, e.calificacion, e.alumnos_id, a.nombre as alumno, e.tareas_id, t.nombre as tarea, m.nombre as materia from entrega_tareas e  join alumnos a on a.id = e.alumnos_id join tareas t on t.id = e.tareas_id join materias m on m.id = t.materias_id where  m.docentes_id=?',[req.user.idDocente],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-ENTREGA TAREAS*/
router.get('/:id',(req,res)=>{
    console.log('get ENTREGA TAREAS')
    mysqlConnection.query('select e.id, e.status, e.calificacion, e.alumnos_id, a.nombre as alumno, e.tareas_id, t.nombre as tarea, m.nombre as materia from entrega_tareas e  join alumnos a on a.id = e.alumnos_id join tareas t on t.id = e.tareas_id join materias m on m.id = t.materias_id Where e.id = ? and  m.docentes_id=?; ',[req.params.id,  req.user.idDocente],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});


/*Get-ENTREGA TAREAS POR MATERIA*/
router.get('/materia/:materia',(req,res)=>{
    console.log('get entregatareas materia')
    mysqlConnection.query(' select e.id, e.status, e.calificacion, e.alumnos_id, a.nombre as alumno, e.tareas_id, t.nombre as tarea, m.nombre as materia from p7uxdnsqddzwy73v.entrega_tareas e  join p7uxdnsqddzwy73v.alumnos a on a.id = e.alumnos_id join p7uxdnsqddzwy73v.tareas t on t.id = e.tareas_id join p7uxdnsqddzwy73v.materias m on m.id = t.materias_id Where m.nombre = ?;',[req.params.materia],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

/*Insert-ENTREGA TAREAS*/
router.post('/',(req,res)=>{
    console.log('Insert ENTREGA TAREAS')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('INSERT INTO entrega_tareas (status, calificacion, alumnos_id, tareas_id) VALUES (?, ?, ?, ?);',
    [emp.status,emp.calificacion,emp.alumnos_id,emp.tareas_id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-ENTREGA TAREAS*/
router.put('/:id',(req,res)=>{
    console.log('Update ENTREGA TAREAS')
    let emp=req.body;
    mysqlConnection.query('UPDATE entrega_tareas SET status = ?, calificacion = ?,alumnos_id = ?, tareas_id = ? WHERE id = ?;',
    [emp.status,emp.calificacion,emp.alumnos_id,emp.tareas_id,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-ENTREGA TAREAS*/
router.delete('/:id',(req,res)=>{
    console.log('Delete ENTREGA TAREAS')
    mysqlConnection.query('delete from entrega_tareas where id = ?;',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;
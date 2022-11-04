const express = require('express');
const router = express.Router();

const accessEndpointAdmin = (req, res, next) => {
    if (req.user.roleId === "admin") {
        return next();
    }
}

const accessEndpointDocente = (req, res, next) => {
    if (req.user.roleId === "user") {
        return next();
    }
}

router.use("/login", require('../controller/security'));

router.use("/usuarios", accessEndpointAdmin, require('../controller/usuarios'));
router.use("/docentes", accessEndpointAdmin, require('../controller/docentes'));
router.use("/materias", accessEndpointAdmin, require('../controller/materias'));
router.use("/periodos", accessEndpointAdmin, require('../controller/periodos'));
router.use("/alumnos", accessEndpointAdmin, require('../controller/alumnos'));
router.use("/materia_docente", accessEndpointAdmin, require('../controller/materia_docente'));
router.use("/materia_alumno", accessEndpointAdmin, require('../controller/materia_alumno'));


router.use("/entrega_tareas", accessEndpointDocente, require('../controller/entrega_tareas'));
router.use("/tareas", accessEndpointDocente, require('../controller/tareas'));
router.use("/materias_tareas", accessEndpointDocente, require('../controller/materias_tareas'));
router.use("/periodos_docente", accessEndpointDocente, require('../controller/periodos_docente'));
router.use("/alumnos_docente", accessEndpointDocente, require('../controller/alumnos_docente'));
router.use("/entregatareas", accessEndpointDocente, require('../controller/entregatareas'));

module.exports = router;
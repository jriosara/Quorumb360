// backend/src/routes/reunionesRoutes.js
const express = require('express');
const router = express.Router();
const reunionesController = require('../controllers/reunionesController');

// Ruta para obtener todas las reuniones
router.get('/', reunionesController.obtenerReuniones);

// Ruta para crear una nueva reunión
router.post('/', reunionesController.crearReunion);

module.exports = router;

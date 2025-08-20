// const express = require('express');
// const router = express.Router({ mergeParams: true }); // <- Añade mergeParams
// const userController = require('../controllers/userController');
// const { authenticateToken } = require('../middleware/auth');
// const { validate, registerSchema, loginSchema, updateProfileSchema } = require('../middleware/validation');

// // Configuración de rutas
// router.route('/register')
//     .post(validate(registerSchema), userController.register);

// router.route('/login')
//     .post(validate(loginSchema), userController.login);

// // Rutas protegidas
// router.route('/profile')
//     .get(authenticateToken, userController.getProfile)
//     .put(authenticateToken, validate(updateProfileSchema), userController.updateProfile)
//     .delete(authenticateToken, userController.deleteProfile); // <- Cambiado a deleteProfile

// // Rutas administrativas
// router.get('/all', authenticateToken, userController.getAllUsers);

// router.route('/user/:id(\\d+)') // <- Validación de número
//     .get(authenticateToken, userController.getUserById)
//     .delete(authenticateToken, userController.deleteUserById); // <- Nombre distinto

// module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    register,
    login,
    getProfile,
    updateProfile,
    deleteProfile,
    getAllUsers,
    getUserById,
    updateUserById, // ✅ IMPORTADO CORRECTAMENTE
    deleteUserById
} = require('../controllers/userController');

const { authenticateToken } = require('../middleware/auth');
const { validate, registerSchema, loginSchema, updateProfileSchema } = require('../middleware/validation');

// Rutas públicas
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Rutas protegidas
router.route('/profile')
    .get(authenticateToken, getProfile)
    .put(authenticateToken, validate(updateProfileSchema), updateProfile)
    .delete(authenticateToken, deleteProfile);

// Rutas administrativas
router.get('/all', authenticateToken, getAllUsers);
router.route('/:id')
    .get(authenticateToken, getUserById)
    .put(authenticateToken, updateUserById)
    .delete(authenticateToken, deleteUserById);

module.exports = router;

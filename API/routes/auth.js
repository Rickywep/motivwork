// Rutas para Autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


// Crear un usuario
// api/auth
router.post(
  '/',
  [
    check('email', 'Agrega un Email Valido').isEmail(),
    check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
  ],
  authController.autenticarUsuario
);

//Obtener usuario autenticado
router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;

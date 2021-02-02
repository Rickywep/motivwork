const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

//Crear feedback
//api/feedback
router.post('/', auth, feedbackController.crearFeedback);
router.get('/', feedbackController.obtenerFeedback);

module.exports = router;

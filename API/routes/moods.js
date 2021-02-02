const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const auth = require('../middleware/auth');

//Crear mood
//api/mood
router.post('/', auth, moodController.crearMood);
// router.get('/', auth, moodController.crearMood);

module.exports = router;

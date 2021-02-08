const Feedback = require('../models/Feedback');

exports.crearFeedback = async (req, res) => {
  try {
    // Crear Feedback
    const feedback = new Feedback(req.body);

    feedback.creador = req.usuario.id;

    feedback.save();
    res.json(feedback);
  } catch (error) {
    console.log('~ error', error);
    res.status(500).send('hubo un error');
  }
};

exports.obtenerFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({registro: -1}).populate('colega creador', 'nombre img');
    res.json({feedbacks})
  } catch (error) {
    console.log('~ error', error);
    res.status(500).send('hubo un error');
  }
};

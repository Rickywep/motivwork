const mongoose = require('mongoose');
const FeedbackSchema = mongoose.Schema({
  colega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  categoria: {
    type: String,
    require: true,
    trim: true,
  },
  contenido: {
    type: String,
    require: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

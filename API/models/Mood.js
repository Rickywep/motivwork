const mongoose = require('mongoose');
const MoodSchema = mongoose.Schema({
  contenido: {
    type: String,
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  anonimo: {
    type: Boolean,
    default: false,
  },
  polaridad: {
    type: String,
  },
  palabra_concepto: {
    type: String,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Mood', MoodSchema);

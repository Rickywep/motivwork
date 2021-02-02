const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function(req, res, next) {
  // Leer token
  const token = req.header('x-auth-token');
  
  // Revisar Token
  if (!token) {
    return res.status(401).json({msg: 'No hay Token, permiso no valido'})
  }

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next()
  } catch (error) {
    res.status(401).json({msg: 'Token no valido'})
  }

}
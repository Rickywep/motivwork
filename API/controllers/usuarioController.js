const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.crearUsuario = async (req, res) => {
  // revisamos los errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisando q el email sea único
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: [{ msg: 'El Usuario ya existe' }] });
    }

    //nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    // Crear y firmar JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
    //mensaje de exito
    // res.json({ msg: 'Usuario Creado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json({ usuarios });
  } catch (error) {
    console.log('~ error', error);
    res.status(500).send('hubo un error');
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    // Extraer el usuario y comprobar si existe
    const { nombre, img } = req.body;

    const usuario = await Usuario.findById(req.params.id);

    if(!usuario){
      return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    // //Crear objeto con la nueva información
    if (nombre) {
      usuario.nombre = nombre      
    }

    if (img) {
      usuario.img = img      
    }

    // // Guardar Usuario
    // usuario = await Usuario.findOneAndUpdate({_id: req.params.id}, usuario, {new: true});
    await usuario.save()
    res.json({ usuario })

  } catch (error) {
    console.log('~ error', error);
    res.status(500).send('Hubo un error');
  }
};

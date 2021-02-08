// Importación de módulos de versiones anteriores
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")


// crear el servidor
const app = express();

// Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.0iotn.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ limit: '50mb', extended: true }));

app.use(cors())
// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/moods", require("./routes/moods"));
app.use("/api/feedbacks", require("./routes/feedbacks"));

// Puerto y arranque del servidor
app.listen(4000, () => {
  console.log("Servidor Funcionando");
});

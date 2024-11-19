import express from 'express';
import router from './usuario/usuariorouter.js';
import routes from './dibujos/dibujosrouter.js';
import cors from 'cors'

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
const app = express();

app.use(express.json());
//indicar para usuario
app.use("/user", router);


//indicar para dibujos
app.use("/drawing", routes);

app.listen(3000, () => console.log("Listening on port: 3000"))


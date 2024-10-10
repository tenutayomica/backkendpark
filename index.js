import express from 'express';
const app = express();

app.use(express.json());
//indicar para usuario
import router from './usuario/usuariorouter.js';
app.use("/user", router);


//indicar para dibujos
import routes from './dibujos/dibujosrouter.js';
app.use("/drawing", routes);

app.listen(3000)

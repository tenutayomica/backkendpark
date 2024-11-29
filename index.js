import express from 'express';
import router from './usuario/usuariorouter.js';
import routes from './dibujos/dibujosrouter.js';
import cors from 'cors'


const app = express();
app.use(cors());

app.use(express.json());
//indicar para usuario
app.use("/user", router);

//indicar para dibujos
app.use("/drawing", routes);

app.listen(3000, () => console.log("Listening on port: 3000"))


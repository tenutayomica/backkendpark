import {Client} from "pg";
import express from 'express';
app.listen(3000);

const routes = express.Router()

routes.get('/')
module.exports = routes;
import  associateuser  from "./dibujoscontrollers.js";
import { cloudupload } from "./dibujoscontrollers.js";
import { savedrawing } from "./dibujoscontrollers.js";
import { receivediagnostic } from "./dibujoscontrollers.js";
import { senddiagnostic } from "./dibujoscontrollers.js";
import { verifyToken } from "../usuario/usuariomidware.js";
routes.post('/usuario/:nombre', verifyToken, associateuser);
routes.put('/upload/:id_usuario', verifyToken, savedrawing);
routes.post('/sano', verifyToken, receivediagnostic);
routes.get('/upload/:id_usuario', verifyToken, senddiagnostic);



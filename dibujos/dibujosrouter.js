import client from "pg";
import express from 'express';
import app from '../index.js';
app.listen(3000);
const routes = express.Router()
routes.get('/', (req, res) => {
    res.send('Hello World')
  })
import Dibutroller from './dibujoscontrollers.js'
import  verifyToken from "../usuario/usuariomidware.js";
routes.post('/usuario/:nombre', verifyToken, Dibutroller.associateuser);
routes.put('/upload/:id_usuario', verifyToken, Dibutroller.savedrawing);
routes.post('/sano', verifyToken, Dibutroller.receivediagnostic);
routes.get('/upload/:id_usuario', verifyToken, Dibutroller.senddiagnostic);
export default {routes};



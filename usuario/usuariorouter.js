import express from 'express';
const router = express.Router()
router.get('/', (req, res) => {
  res.send('Hello World')
})
import client from '../pgconfig.js';
import verifyToken from './usuariomidware.js'
import usuarioController from './usuariocontrollers.js'
router.post('/newuser', usuarioController.newuser)
router.post('/login', usuarioController.login)
router.put('/:nombre', verifyToken, usuarioController.cambiacon)
router.delete('/:nombre', verifyToken, usuarioController.deleteuser)
export default { router };

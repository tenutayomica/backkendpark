import express from 'express';
const router = express.Router()
router.get('/', (req, res) => {
  res.send('Hello World')
})
import verifyToken from './usuariomidware.js'
import usuarioController from './usuariocontrollers.js'
router.post('/newuser', usuarioController.newuser)
router.post('/login', usuarioController.login)
router.put('/', verifyToken, usuarioController.cambiacon)
router.post('/mandarMail', usuarioController.mandaEmail)
router.post('/verifyCode', usuarioController.verifyCode)
router.post('/resetPassword', usuarioController.cambiacon)
//router.delete('/:nombre', verifyToken, usuarioController.deleteuser)
export default router;

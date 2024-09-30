//usuario router
router.get('/', (req, res) => {
    res.send('Hello World')
  })
   // app.get('/about', (req, res) => {
  //  res.send('About route 🎉  ')
  //})
   import express from 'express';
  const router= express.Router()

  module.exports = router
  import client from '../pgconfig.js';
  import verifyToken from './usuariomidware.js'
  import newuser from './usuariocontrollers.js';
  import login from './usuariocontrollers.js';
  import CambiaCon from './usuariocontrollers.js';
  import deleteuser from './usuariocontrollers.js';
  router.post('/', newuser)
  router.post('/login', login)
  router.put('/:nombre',verifyToken, CambiaCon)
  router.delete('/:nombre',verifyToken, deleteuser)
  

 
  
  
import jwt from 'jsonwebtoken';
import UsuarioService from './usuarioservices.js';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import usuarioservices from './usuarioservices.js';

//registro de usuario
const newuser = async (req, res) => {
  console.log("new user", req.body)
  const {nombre, email, contraseña} = req.body;
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: 'Datos de usuario incompletos' });
  }
  else {
    try {
      console.log("user exists", nombre)
      const userExists = await UsuarioService.Finduser(nombre);
      console.log("exists 2", userExists)
      if (!userExists) {
        const hashedPassword = await bcryptjs.hash(contraseña, 10);
        const newUser =
        {
          nombre: nombre,
          email: email,
          contraseña: hashedPassword,
        }
        const savedUser = await UsuarioService.RegistSer(newUser);

        res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });
        
      }
      else {
        return res.status(409).json({ error: 'El usuario ya existe'});
      }
    }
    catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'failed to create user'});

    }
  }
};

//ingresar 
const login =
  async (req, res) => {
    const { nombre, contraseña } = req.body;
    console.log(nombre,contraseña);
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Se requiere nombre y contraseña' });
    }
    else {
      try {
        console.log(nombre);
        const user = await UsuarioService.Finduser(nombre);
        if (!user) { return res.status(400).json({ error: 'invalid user' }) }
        else{
        const checkPassword = await bcryptjs.compare(contraseña, user.contraseña);
        console.log(checkPassword);
        if (!checkPassword) {
          return res.status(400).json({ error: 'invalid password' })
        }
        else {
          const token = jwt.sign({ usernombre: nombre }, 'Secret123', { expiresIn: '1h' });
          res.status(200).json({ token:token });
        }}
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'unable to login' })
      }
    }
  };



/*const transporter = nodemailer.createTransport({
  service: 'service_gb0sq1m',
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,

});
 // port: process.env.EMAIL_PORT
function randomNumGenerator(min, max) {
  const randomNums = [];

  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNums.push(randomNum);
  }
};*/

//cambiar contraseña o nombre
const mandaEmail = async (req,res)=>{
  const {email} = req.body;
  console.log(email);
  if (!email){
    res.status(400).json({message: 'email required'});
  }
  try{
    const buscaUsu = await usuarioservices.FindUserByEmail(email);
    if(!buscaUsu){
      res.status(403).json({message:'invalid email'});
    }
    else{
      //const numChain = randomNumGenerator(1,4);
      //console.log(numChain);
      //const token = jwt.sign({email: email, truecode: numChain}, 'Secret123', {expiresIn: '1h'});
      transporter.sendMail({
        from:'micatenu@gmail.com',
        to: email,
        subject:'cambio de contraseña',
        text: 'ingresa estos números en nuestra página para cambiar tu contraseña 4583' 
      })
      res.status(200).json({message:'mail enviado'});
    }
  }
  catch(error){
  console.error(error, 'error');
    res.status(500).json({ error: 'error' });
  }
};
const verifyCode= async (req,res)=>{
  try {
    const {code}= req.body;
    if(code == 4583){
      res.status(200).json({message: 'code verified successfully'});
    }
    else{
      res.status(400).json({message: 'invalid code'});
    }

  }
  catch(error){
    console.error(error, 'error');
    res.status(500).json({ error: 'error' });
  }
};
const cambiacon= async (req,res)=> {
  const {nuevaContraseña, email}= req.body;
  const changepassword= await usuarioservices.changepassword(nuevaContraseña,email);
}

/*borrar usuario
const deleteuser = async (req, res) => {
  const { nombre } = req.params.nombre;
  const ban = await UsuarioService.BanishSer(nombre);
  return 'borrado';
};*/

const controller = {
 login, newuser, cambiacon, mandaEmail, verifyCode
};

export default controller;
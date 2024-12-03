import jwt from 'jsonwebtoken';
import UsuarioService from './usuarioservices.js';
import bcryptjs from 'bcryptjs';
import usuarioservices from './usuarioservices.js';
import cloudinaryconfig from '../cloudinaryconfig.js';
import fs from 'fs';

//registro de usuario
const newuser = async (req, res) => {
  console.log("new user", req.body)
  const { nombre, email, contraseña } = req.body;
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
        return res.status(409).json({ error: 'El usuario ya existe' });
      }
    }
    catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'failed to create user' });

    }
  }
};

//ingresar 
const login =
  async (req, res) => {
    const { nombre, contraseña } = req.body;
    console.log(nombre, contraseña);
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Se requiere nombre y contraseña' });
    }
    else {
      try {
        console.log(nombre);
        const user = await UsuarioService.Finduser(nombre);
        if (!user) { return res.status(400).json({ error: 'invalid user' }) }
        else {
          const checkPassword = await bcryptjs.compare(contraseña, user.contraseña);
          console.log(checkPassword);
          if (!checkPassword) {
            return res.status(400).json({ error: 'invalid password' })
          }
          else {
            const token = jwt.sign({ usernombre: nombre }, 'Secret123', { expiresIn: '1h' });
            res.status(200).json({ token: token });
          }
        }
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
const mandaEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res.status(400).json({ message: 'email required' });
  }
  try {
    const buscaUsu = await usuarioservices.FindUserByEmail(email);
    if (!buscaUsu) {
      res.status(403).json({ message: 'invalid email' });
    }
    else {
      const token = jwt.sign({ truecode: 4583, email: email }, 'Secret123', { expiresIn: '1h' });
      res.status(200).json({ token: token });

    }
  } 
  catch (error) {
    console.error(error, 'error');
    res.status(500).json({ error: 'error' });
  }
};
const verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (code == 4583) {
      res.status(200).json({ message: 'code verified successfully' });
    }
    else {
      res.status(400).json({ message: 'invalid code' });
    }

  }
  catch (error) {
    console.error(error, 'error');
    res.status(500).json({ error: 'error' });
  }
};
const cambiacon = async (req, res) => {
  const { nuevaContraseña } = req.body;
  console.log(nuevaContraseña);
  const con = await bcryptjs.hash(nuevaContraseña, 10);
  console.log(con);
  const changepassword = await usuarioservices.changepassword(con, req.email);
  res.status(200).json({ message: 'new password uploaded' });
}

/*borrar usuario
const deleteuser = async (req, res) => {
  const { nombre } = req.params.nombre;
  const ban = await UsuarioService.BanishSer(nombre);
  return 'borrado';
};*/
const profile = async (req, res) => {
  console.log("AAAAAAAAAAAAAA")
  try {
    const imageFile = req.file.path;
    console.log(imageFile);
    const result = await cloudinaryconfig.uploader.upload(imageFile, {
      folder: 'uploaded',
    });

    const imageUrl = result.secure_url;
    console.log(imageUrl);

    const { nombreposta, apellido, genero, fechanacimiento } = req.body;
    console.log(nombreposta, apellido, genero, fechanacimiento);
    if (!nombreposta || !apellido || !genero || !fechanacimiento) {
      res.status(400).json({ message: 'datos incompletos' });
    }
    const getuser = await usuarioservices.Finduser(req.nombre);
    if (!getuser) {
      res.status(404).json({ message: 'user not found' });
    }
    else {
      const savename = await usuarioservices.savenombreposta(nombreposta, req.nombre);
      const saveape = await usuarioservices.saveapellido(apellido, req.nombre);
      const savegen = await usuarioservices.savegender(genero, req.nombre);
      const savebirth = await usuarioservices.savebirthdate(fechanacimiento, req.nombre);
      const saveimg = await usuarioservices.saveimg(imageUrl, req.nombre);
      res.status(200).json({ message: 'data uploaded to detabase' });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }

}

const sendprofile= async (req,res)=>{
  try{
    const grabdata= await usuarioservices.getProfile(req.nombre);
    res.status(200).json(grabdata);
  }
    catch(error){
      console.error(error);
      res.status(500).json({message: 'error'});

    }
}

const controller = {
  login, newuser, cambiacon, mandaEmail, verifyCode, profile, sendprofile
};

export default controller;
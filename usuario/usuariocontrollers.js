import jwt from 'jsonwebtoken';
import UsuarioService from './usuarioservices.js';
import bcryptjs from 'bcryptjs';

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
          const user= await UsuarioService.GetId(nombre);
          const token = jwt.sign({ userid: user.id }, 'Secret123', { expiresIn: '1h' });
          res.status(200).json({ user, token });
        }}
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'unable to login' })
      }
    }
  };






//cambiar contraseña o nombre
/*const cambiacon = async (req, res) => {
  try {
    const { nombre } = req.params.nombre;
    const upd = await UsuarioService.UpdateSer(nombre);
    res.status(200).json({ message: 'success' });
  }
  catch (error) {
    console.error(error, 'error');
    res.status(500).json({ error: 'error' });
  }
};


//borrar usuario
const deleteuser = async (req, res) => {
  const { nombre } = req.params.nombre;
  const ban = await UsuarioService.BanishSer(nombre);
  return 'borrado';
};*/

const controller = {
 login, newuser
};

export default controller;
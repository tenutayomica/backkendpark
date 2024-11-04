import jwt from 'jsonwebtoken';
import UsuarioService from './usuarioservices.js';


//registro de usuario
const newuser = async (req, res) => {
  const {nombre, email, contraseña} = req.body;
  console.log(nombre,email,contraseña);

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: 'Datos de usuario incompletos' });
  }
  else {
    try {

      const userExists = await UsuarioService.Finduser(nombre);
      if (userExists) {
        return res.status(409).json({ error: 'El usuario ya existe'});
      }
      else {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser =
        {
          nombre: nombre,
          email: email,
          contraseña: hashedPassword,
        }
        const savedUser = await UsuarioService.RegistSer(newUser);

        res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });
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
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Se requiere nombre y contraseña' });
    }
    else {
      try {
        const user = await UsuarioService.Finduser(nombre);
        if (!user) { return req.status(400).json({ error: 'invalid user' }) }
        else{
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const checkPassword = await bcrypt.compare(hashedPassword, user.contraseña);
        if (!checkPassword) {
          return req.status(400).json({ error: 'invalid password' })
        }
        else {
          const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          req.status(200).json({ user, token });
        }}
      }
      catch (error) {
        console.error(error);
        req.status(500).json({ error: 'unable to login' })
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
    req.status(500).json({ error: 'error' });
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
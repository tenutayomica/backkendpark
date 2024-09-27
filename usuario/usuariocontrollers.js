import {client} from './pgconfig.js';
// (req,res=> {
//   res.send('conexion correcta')
// })

import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
app.use(express.json());
// guardar usuario nuevo
//revisar 
import RegistSer from './usuarioservices';
import Finduser  from './usuarioservices.js';
import UpdateSer from './usuarioservices';
import BanishSer  from './usuarioservices';
import AuthSer from './usuarioservices';
export const newuser = (
 (req, res) => {
   const fin = await Finduser(nombre);
   if (Finduser = null){
   try{
 
  usuario= req.body;
   const hashed =  await bcryptjs.hash(  usuario.contraseña, 10)
  console.log("usuario", usuario)
  console.log("hashed", hashed)
  const reg = await RegistSer(usuario);
  res.json();
  }
  catch{}}
  else{
    return error;
  }
})


//autenticar
export const login = 
((req,res)=>{
  try{
  
  const auht= await AuthSer(nombre,contraseña)
  const{nombre,contraseña}= req.body;
  
 const hashed = usuario_db.contraseña;
 const match = await.bcryptjs.compare (contraseña, hashed);
  await client.end();
  if (match){
  
    const token= "token"
    jwt.sign({nombre:usuario_db.userid},clave)
    res.json({'nombre': usuario_db.nombre, 'email':usuario_db.email, 'token': token})
    return;
  }
  res.send("inexistente")}
  catch{}
}
  )





//cambiar contraseña o nombre
//falta agragar lo del mmiddleware
const CambiaCon = async (req,res) => 
{
  const upd= await UpdateSer(nombre);
  return 'updated';
};

//borrar usuario
//falta agragr lo del middleware
export const deleteuser =async (req,res)=> {
  const ban= await BanishSer(nombre);
  return 'borrado';
}





//usuario services
import client from '../pgconfig.js'
import pg from 'pg'
const { Client } = pg
//registro
 const RegistSer= async (newuser)=>{
   const cliente = new Client(client)
   await cliente.connect(); 
    try {
    
      const {rows}=  await cliente.query('INSERT INTO usuario ("email", "nombre", "contraseña") VALUES ($1, $2, $3)', 
      [newuser.email, newuser.nombre, newuser.contraseña])
    await cliente.end();
    return rows;
    }
    catch(error){
        await cliente.end();
        throw error;
    }
} 
 const Finduser= async (nombre)=>{ 
    const cliente = new Client(client)
    await cliente.connect();
    try
    {
     const {rows}= await cliente.query('SELECT * FROM "usuario" WHERE nombre= $1', [nombre])
     if (rows.length < 1) return null;
     await cliente.end();
     
     return rows[0];
     
}
catch(error){
    await cliente.end();
    throw error;
}
}
//autenticar
//consultar
 const AuthSer = async (nombre) =>{
    const cliente = new Client(client)
    await cliente.connect();
    try{
        const {rows}= await cliente.query("select * from where nombre = $1", [nombre])
        await cliente.end();
        return rows;
//console.log(result)
//const usuario_db = 

}
catch(error){
    await cliente.end();
    throw error;
}
}


//update contraseña
/* const UpdateSer = async (req,res)=>{
    await client.connect();
    try{  
        const{rows} = await client.query ("UPDATE usuario SET (contraseña) = '?' WHERE nombre = '?' AND contraseña = '?'", [req.body.contrseña, req.params.nombre, req.params.contraseña]);
        return rows;
     
    }
    catch(error){
        await client.end();
        throw error;
    }
}*/

//delete user
 /*const BanishSer= async (req,res) =>{
    try{
        const{rows}= await client.query ('DELETE * FROM usuario WHERE', [req.params.nombre, req.params.contrseña])
      }
      catch(error){
        throw error
      }
}*/
export default {
    Finduser, AuthSer, RegistSer
};
//usuario services
import {client} from '../pgconfig'

//registro
 const RegistSer= async (usuario)=>{
   await client.connect(); 
    try {
    
      const {rows}=  await client.query('INSERT INTO usuario ("email", "nombre", "contraseña") VALUES ($1, $2, $3)', 
      [usuario.email, usuario.nombre, usuario.contraseña, hashed])
    await client.end();
    return rows;
    }
    catch(error){
        await client.end();
        throw error;
    }
} 
 const Finduser= async (nombre)=>{ 
    await client.connect();
    try
    {
     const {rows}= await client.query('SELECT * FROM "usuario" WHERE nombre= $1', [req.params.nombre])
     await client.end();
     return rows;
    //consultar esto
     if(rows.length <1){
        return null;
     }
     else {
         throw error;
     }
}
catch(error){
    await client.end();
    throw error;
}
}
//autenticar
//consultar
 const AuthSer = async (nombre) =>{
    await client.connect();
    try{
        const {rows}= await client.query("select * from where nombre = $1", [nombre])
        await client.end();
        return rows;
//console.log(result)
//const usuario_db = 

}
catch(error){
    await client.end();
    throw error;
}
}


//update contraseña
 const UpdateSer = async (req,res)=>{
    await client.connect();
    try{  
        const{rows} = await client.query ("UPDATE usuario SET (contraseña) = '?' WHERE nombre = '?' AND contraseña = '?'", [req.body.contrseña, req.params.nombre, req.params.contraseña]);
        return rows;
     
    }
    catch(error){
        await client.end();
        throw error;
    }
}

//delete user
 const BanishSer= async (req,res) =>{
    try{
        const{rows}= await client.query ('DELETE * FROM usuario WHERE', [req.params.nombre, req.params.contrseña])
      }
      catch(err){}
}
export default {
    Finduser, BanishSer, UpdateSer, AuthSer, RegistSer
};
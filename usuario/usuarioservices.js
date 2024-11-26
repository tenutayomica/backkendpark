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
     const {rows}= await cliente.query('SELECT "contraseña" FROM usuario WHERE "nombre"= $1', [nombre])
     if (rows.length < 1) return null;
     await cliente.end();
     
     return rows[0];
     
}
catch(error){
    await cliente.end();
    throw error;
}
}
const FindUserByEmail = async (email)=>{
    const cliente = new Client(client)
    await cliente.connect();
    try{
        const {rows} = await cliente.query('SELECT * FROM usuario WHERE ("email")=$1', [email])
        if (rows.length < 1) return null;
        await cliente.end();
     
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;

    }
}
const GetId= async (nombre)=>{
    const cliente = new Client(client)
    await cliente.connect();
    try
    {
     const {rows}= await cliente.query('SELECT "id" FROM usuario WHERE "nombre"= $1', [nombre])
     if (rows.length < 1) return null;
     await cliente.end();
     
     return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}

const changepassword = async (con, email)=>{
    const cliente = new Client(client);
    await cliente.connect();
    try{
        const {rows}= await cliente.query('UPDATE usuario SET "contraseña" = $1 WHERE "email"= $2 ', [con, email]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
};



export default {
    Finduser, GetId, RegistSer, FindUserByEmail, changepassword
};
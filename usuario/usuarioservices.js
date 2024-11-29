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
     const {rows}= await cliente.query('SELECT "id" FROM usuario WHERE ("nombre") = $1', [nombre])
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

const savenombreposta = async (nombreposta, nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const{rows}= await cliente.query('UPDATE usuario SET "truename"= $1 WHERE "nombre" = $2', [nombreposta, nombre]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}
const saveapellido = async (apellido, nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const{rows}= await cliente.query('UPDATE usuario SET "apellido"= $1 WHERE "nombre" = $2', [apellido, nombre]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}
const savegender = async (genero, nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const{rows}= await cliente.query('UPDATE usuario SET "gender"= $1 WHERE "nombre" = $2', [genero, nombre]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}
const savebirthdate = async (fechanacimiento, nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const{rows}= await cliente.query('UPDATE usuario SET "birthdate"= $1 WHERE "nombre" = $2', [fechanacimiento, nombre]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}

const saveimg = async (imageUrl, nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const{rows}= await cliente.query('UPDATE usuario SET "profileimg"= $1 WHERE "nombre" = $2', [imageUrl, nombre]);
        await cliente.end();
        return rows[0];
    }
    catch(error){
        await cliente.end();
        throw error;
    }
}


export default {
    Finduser, GetId, RegistSer, FindUserByEmail, changepassword, saveapellido, savebirthdate, savegender, saveimg, savenombreposta
};
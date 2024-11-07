
import client from '../pgconfig.js'
import pg from 'pg'
const { Client } = pg
/*const iduser = async (nombre)=> {
    const cliente= new Client(client);
    await cliente.connect();
    try{
        const {rows}= await cliente.query('SELECT ("id") FROM usuario WHERE "nombre" = $1', [nombre]);
        await cliente.end()
        return rows[0];

    }
    catch (error){
        console.error(error, 'error');
        res.status(500).json({error: 'error'});
    }
}*/
const saveusernom = async (nombre)=> {
    const cliente= new Client(client);
    await cliente.connect();
    try{
    const {rows}= await cliente.query('INSERT INTO dibujos ("username") VALUES ($1)', [nombre])
    await cliente.end();
    return rows;}
    catch(error){
        console.error(error, 'error');
        res.status(500).json({error: 'error'});
    }
};

const url= async (imageUrl,nombre)=>{
    const cliente= new Client(client);
    await cliente.connect();
    try{
    const{rows} = await cliente.query ('INSERT INTO dibujos ("ruta","username") VALUES ($1,$2)',  [imageUrl, nombre]);
     await cliente.end();
     return rows;
}
catch(error){
    console.error(error, 'error');
    res.status(500).json({error: 'error'});
}
};
const iasmt= async ()=>{
    const cliente= new Client(client);
await cliente.connect();
const{rows}= await cliente.query('INSERT INTO dibujos ("sano") VALUES = $1 WHERE username = $2 ', [req.body.sano, req.params.nombre]);
};
export default{
    saveusernom, url, iasmt
};
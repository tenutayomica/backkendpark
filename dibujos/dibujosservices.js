import client from "pg";
const iduser = async ()=> {
    await client.connect();
    try{
        const {rows}= await client.query('SELECT ("id") FROM usuario WHERE nombre = $1', [nombre]);
        await client.end()
        return rows[0].id;

    }
    catch (error){
        console.error(error, 'error');
        resizeBy.status(500).json({error: 'error'});
    }
}
const saveuserid = async ()=> {
    await client.connect();
    const {rows}= await client.query('INSERT INTO dibujos ("id_usuario") VALUES $1', [guardar])
}

const url= async ()=>{
    await client.connect();
    const{rows} = await client.query ("INSERT INTO dibujos (ruta) VALUES ($1) WHERE id_usuario = $2",  [imageUrl],[req.body.ruta, req.params.id_usuario]);
}
const iasmt= async ()=>{
await client.connect();
const{rows}= await client.query('INSERT INTO dibujos ("sano") VALUES = $1 ', [req.body.sano,req.params.contraseña,req.params.nombre]);
}
export default{
    saveuserid, iduser, url, iasmt
};
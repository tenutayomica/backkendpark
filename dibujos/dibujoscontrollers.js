//dibujos
import dibujosservices from './dibujosservices.js';
import  cloudinaryconfig  from '../cloudinaryconfig.js';
// buscar que usuario la subió y agarrar el id, guardar id_usuario
/*const associateuser =
    (async (req, res) => {
        try {
            
            const guardar= await dibujosservices.saveusernom(req.nombre);
            res.status(200).json({ message: 'success'})

        }
        catch (error) { console.error(error);
            res.status(500).json({ error: 'nope' }) }
    }
    );*/

//Subir img a cloudinary:
const savedrawing = ( async (req,res)=>{
    try{
 const imageFile = req.file.path;
 const result = await cloudinaryconfig.uploader.upload(imageFile, {
    folder: 'uploaded',
});

const imageUrl = result.secure_url;
const uploadToDatabase = await dibujosservices.url(imageUrl, req.nombre);
}
catch(error){
    console.error(error, 'eror');
    res.status(500).json({error:'failed'});
};
});
//avisar a IA
//const response = await fetch('http://tu-ia/nueva-imagen', {
   // method: 'POST',
   // headers: {
    //    'Content-Type': 'application/json'
    //},
   // body: JSON.stringify({
   //     imageUrl: imageUrl,
    //    userId: userId
   // })
//});

//if (!response.ok) {
//    throw new Error('Error al notificar a la IA');
//}

//res.json({ message: 'Image uploaded successfully!', imageUrl });


//IA enviar porcentaje


//mandar porcentaje al front

const controller = {
     savedrawing
};
export default controller;
//dibujos
import dibujosservices from './dibujosservices.js';
import  cloudinaryconfig  from '../cloudinaryconfig.js';
// buscar que usuario la subió y agarrar el id, guardar id_usuario
const associateuser =
    (async (req, res) => {
        try {
            const { nombre } = req.params.nombre;
            const guardar = await dibujosservices.iduser(nombre);
            const final = await dibujosservices.saveuserid(guardar)
            res.status(200).json({ message: 'success' })

        }
        catch (err) { console.log(err) }
    }
    );





//Subir img a cloudinary:
const savedrawing = ( async (eq,res)=>{
    try{
const imageFile = req.file.path;

const result = await cloudinaryconfig.uploader.upload(imageFile, {
    folder: 'uploaded',
});

const imageUrl = result.secure_url;
const uploadToDatabase = await dibujosservices.url(imageUrl);
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
export const receivediagnostic =
    (
        async (req, res) => {
            try {

                const di = await dibujosservices.iasmt()
            }
            catch (err) { console.log(err) }
        });

//mandar porcentaje al front
export const senddiagnostic = (
    async (req, res) => { }
);
const controller = {
    senddiagnostic, receivediagnostic, savedrawing, associateuser
};
export default controller;
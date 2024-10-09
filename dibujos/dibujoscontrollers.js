//dibujos
import client from '../pgconfig.js';
import app from '../index.js';
app.listen(3000);
import multerUploads from '../multerconfig.js';
import upload from '../multerconfig.js';
import dibujosservices from './dibujosservices.js';
app.use(express.json());
import  verifyToken  from '../usuario/usuariomidware.js';
// buscar que usuario la subió y agarrar el id, guardar id_usuario
const associateuser=
(async (req,res)=>{
    try{
        const {nombre}= req.params.nombre;
        const guardar= await dibujosservices.iduser(nombre);
        const final = await dibujosservices.saveuserid(guardar)
        res.status(200).json({message: 'success'})
     
    }
        catch(err){console.log(err)}
    }
    );





//Subir img a cloudinary:
 const cloudupload =
(
await cloudinary.uploader
.upload(
    'https://api.cloudinary.com/v1_1/diutxqzta/image/upload', {
        
    }
)
.catch((error) => {
    console.log(error);
})
);
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // subir a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path , {
         folder:'uploaded'
      });
   // mandar urlcloudinary

   const imageUrl= result.secure_url;
   const savedrawing = await dibujosservices.url(imageUrl);
} 
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error uploading image to Cloudinary' });
}
});

  
//avisar a IA
const response = await fetch('http://tu-ia/nueva-imagen', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        imageUrl: imageUrl,
        userId: userId
    })
});

if (!response.ok) {
    throw new Error('Error al notificar a la IA');
}

res.json({ message: 'Image uploaded successfully!', imageUrl });


//IA enviar porcentaje
export const receivediagnostic=
(
async (req,res) => {
try{
   
    const di= await dibujosservices.iasmt()
}
    catch(err){console.log(err)}
});

//mandar porcentaje al front
export const senddiagnostic=(
    async (req,res)=>{}
);
const controller = {
    senddiagnostic, receivediagnostic, savedrawing, cloudupload, associateuser
};
export default controller;
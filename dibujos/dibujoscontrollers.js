//dibujos
import {client} from './pgconfig.js';
app.listen(3000);
import multerUploads from './multerconfig.js';
import upload from './multerconfig.js';
app.use(express.json());

// buscar que usuario la subió y agarrar el id, guardar id_usuario:
import nombre from '../usuario/usuariocontrollers';
import contraseña from '../usuario/usuariocontrollers';
//falta cambiar esto por middleware
//usar los valores nombre y contraseña de login consultar si esta es la forma correcta
export const associateuser=
(
(req,res)=>{
    try{
        const[results,fields]= await client.query('SELECT "id" FROM usuario WHERE "nombre"='+nombre+' AND contraseña= '+contraseña ,[req.params.nombre]);
        res.json(results);
        idusu = results;
        const[results,fields]= await client.query('INSERT INTO dibujos ("id_usuario") VALUES ()', [req.body.id_usuario]);
        res.json(results);
    }
        catch(err){console.log(err)}
    }
    );





//Subir img a cloudinary (consultar por errores):
export const cloudupload=
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
         folder:'folder_name'
      });
   // mandar urlcloudinary
   res.json({ imageUrl: result.secure_url });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error uploading image to Cloudinary' });
}
});



// guardar dibujo nuevo en bdd:

export const savedrawing=(
 async (req,res) => {
    try{
        const[results,fields] = await client.query ("INSERT INTO dibujos (ruta,sano) VALUES ('?','?') WHERE id_usuario = '?'", [req.body.sano, req.body.ruta, req.params.id_usuario]);
        res.json(results);}
        catch(err){console.log(err)}
});

app.post('/upload', multerUploads, (req, res) => {
    console.log('req.body :', req.body);
    });//revisar y arreglar
  
//avisar a IA

//IA enviar porcentaje
export const receivediagnostic=
(
async (req,res) => {
    try{
        const[results,fields]= await Client.query("INSERT INTO dibujos (sano) VALUES = " + sanferm+ "WHERE usuario.contraseña =  "+contrausu+"AND usuario.nombre = "+nomusu, [req.body.sano,req.params.contraseña,req.params.nombre]);
    }
    catch(err){console.log(err)}
});

//mandar porcentaje al front
export const senddiagnostic=(
    async (req,res)=>{}
);
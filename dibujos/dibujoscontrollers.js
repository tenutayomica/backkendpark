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
console.log(imageUrl);
const uploadToDatabase = await dibujosservices.url(imageUrl, req.nombre);
res.status(201).json({message: 'img uploaded to database'});
}
catch(error){
    console.error(error, 'eror');
    res.status(500).json({error:'failed'});
};
});
//avisar a IA
//recomendación de gemini:
/*const response = await fetch(iaApiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  });
  
  const iaResponse = await response.json();
  console.log(iaResponse); // Process the IA's response*/
  const aiyapyap = (async (req,res)=>{
    try{
        let promise = fetch(url, [options])
        .then
    }
   catch(error){
    console.error(error, 'eror');
    res.status(500).json({error:'failed'});
   }
});
   
//IA enviar porcentaje


//mandar porcentaje al front

const controller = {
     savedrawing, aiyapyap
};
export default controller;
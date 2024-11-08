//dibujos
import dibujosservices from './dibujosservices.js';
import cloudinaryconfig from '../cloudinaryconfig.js';
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
const savedrawing = (async (req, res) => {
    try {
        const imageFile = req.file.path;
        const result = await cloudinaryconfig.uploader.upload(imageFile, {
            folder: 'uploaded',
        });

        const imageUrl = result.secure_url;
        console.log(imageUrl);
       
            const uploadToDatabase = await dibujosservices.url(imageUrl, req.nombre);
            res.status(201).json({ message: 'img uploaded to database' });
      
        
    
        
    }
    catch (error) {
        console.error(error, 'eror');
        res.status(500).json({ error: 'failed' });
    };
});

const postData = (async (req, res) => {
    try {
       const {imageUrl} = req.body;
        const response = await fetch('https://conexi-n-ia-front-back.onrender.com', imageUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imageUrl),
            });
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            const savediagnostic = await dibujosservices.sanpark(result, req.nombre);
            res.status(200).json({message: 'diagnostic uploaded', savediagnostic});
        }
        else {
            console.error('Error:', response.status, response.statusText);
        };
    }
    catch (error) {
        console.error(error, 'error');
        res.status(500).json({ error: 'failed' });
    }
});

const controller = {
    savedrawing, postData
};
export default controller;
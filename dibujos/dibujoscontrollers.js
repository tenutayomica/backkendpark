//dibujos
import dibujosservices from './dibujosservices.js';
import cloudinaryconfig from '../cloudinaryconfig.js';
import fs from 'fs';
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
        console.log("req:", req.file.path)
        const imageFile = req.file.path;
        const result = await cloudinaryconfig.uploader.upload(imageFile, {
            folder: 'uploaded',
        });

        const imageUrl = result.secure_url;
        console.log(imageUrl);


        const uploadToDatabase = await dibujosservices.url(imageUrl, req.nombre);
        fs.unlinkSync(imageFile);
        res.status(201).json({ message: 'img uploaded to database' });

    }

    catch (error) {
        console.error(error, 'eror');
        res.status(500).json({ error: 'failed' });
    };
});

/*const response = await fetch('http://127.0.0.1:8000/items', 
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

const postData = (async (req, res) => {
    try {
       const {imageUrl} = req.body;
       console.log('entra');
       if (typeof imageUrl !== 'string') {
        imageUrl = imageUrl.toString();
      }
      console.log('entrados');
        const response = await fetch('http://127.0.0.1:8000/items', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imageUrl),
            });
            console.log('entratres');
        if (response.ok) {
            console.log('entracuatro');
            const result = await response.json();
            console.log('Success:', result);
            res.status(200).json(result);
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

const postResultToFront =(async (req, res)=> {
    try{
        const response = await fetch('fronturl', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify("tiene parkingson"),
            });
            console.log('entratres');
        if (response.ok) {
            console.log('entracuatro');
            const result = await response.json();
            console.log('Success:', result);
            res.status(200).json(result);
        }
        else {
            console.error('Error:', response.status, response.statusText);
        };
    }
    catch (error) {
        console.error(error, 'error');
        res.status(500).json({ error: 'failed' });
    }
    } 
);*/

const controller = {
    savedrawing
};
export default controller;
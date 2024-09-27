
// Start the server
app.listen(3000)



import express from 'express';
const app = express();
import multeruploads from './multerconfig.js';//consultar si esto no debería ir en dibujos router
//https://medium.com/@joeeasy_/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
//consultar si debería seguir el link
app.post('/upload', multeruploads, (req, res) => {
    console.log('req.body :', req.body);
    });
//indicar para usuario
import router from './usuario/usuariorouter.js';
app.use("/user", router);


//indicar para dibujos
import dibujosRouter from './dibujos/dibujosrouter.js';
app.use("/drawing", dibujosRouter);

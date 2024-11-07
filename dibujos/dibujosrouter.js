
import express from 'express';
import multer from 'multer';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {join} from 'path';
const routes = express.Router()

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  // Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
  const uploadDir = join(__dirname, "../uploads");
  
  // Se define donde se va a ubicar el archivo que vamos a subir y el nombre, este se puede modificar, en este caso el nombre que se le va a asignar es la fecha de subida sumado del nombre del archivo original
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
          cb(null, `${Date.now()}-${file.originalname}`)
      }
  });
  
  // El siguiente filtro es para que se suban unicamente archivos con extensiones especificas. En este caso serian JPEG, PNG y JPG
  const fileFilter = (req, file, cb) => {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
      }
  };
  
  const upload = multer({
      storage: storage
  });

  const uploadx = multer({ dest: "uploads/" });
  
import controller from './dibujoscontrollers.js'

import  verifyToken from "../usuario/usuariomidware.js";

//routes.post('/getuser', verifyToken, controller.associateuser);
routes.post('/upload', verifyToken,  upload.single('file'), controller.savedrawing);
//routes.post('/sano', verifyToken, controller.receivediagnostic);
//routes.get('/upload/:id_usuario', verifyToken, controller.senddiagnostic);

export default routes;


 
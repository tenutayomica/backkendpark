import express from 'express';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
const router = express.Router()
router.get('/', (req, res) => {
    res.send('Hello World')
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
const uploadDir = join(__dirname, "../uploads");
console.log(uploadDir);
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
console.log(upload);

import verifyToken from './usuariomidware.js'
import usuarioController from './usuariocontrollers.js'
router.post('/newuser', usuarioController.newuser)
router.post('/login', usuarioController.login)
router.post('/mandarMail', usuarioController.mandaEmail)
router.post('/verifyCode', usuarioController.verifyCode)
router.post('/resetPassword', usuarioController.cambiacon)
router.post('/profile', verifyToken, upload.single('file'), usuarioController.profile)
router.get('/sendprofile', verifyToken, usuarioController.sendprofile)
//router.delete('/:nombre', verifyToken, usuarioController.deleteuser)
export default router;

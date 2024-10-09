
import multer from 'multer';
const storage = multer.memoryStorage()  // store image in memory
const upload = multer({ storage: storage })
const multerUploads = multer({ storage }).single('image');
//module.exports = upload

import Datauri from 'datauri';
import path from 'path';

const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
export default { multerUploads, dataUri };
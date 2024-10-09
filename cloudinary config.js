import { v2 as cloudinary } from 'cloudinary';
import { config, uploader } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
// Configuration
const cloudinaryconfig= config({ 
    cloud_name: 'diutxqzta', 
    api_key: '577741984887614', 
    api_secret: 'yeKfGfNqjtfkVwDyQTeF20beK-8' 
});
export default { cloudinaryconfig, uploader };

// Upload an image
const uploadResult = await cloudinary.uploader
.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    }
)
.catch((error) => {
    console.log(error);
});

console.log(uploadResult);



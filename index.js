import express from 'express';
const app = express();

app.use(express.json());
//indicar para usuario
import router from './usuario/usuariorouter.js';
app.use("/user", router);


//indicar para dibujos
import routes from './dibujos/dibujosrouter.js';
app.use("/drawing", routes);

app.listen(3000)

import https from 'https'

function fetchData(url) {
  const options = {
    rejectUnauthorized: false // Ignore certificate errors (not recommended for production)
  };

  https.get(url, options, (res) => {
    // Handle the response data here
    console.log('statusCode:', res.statusCode);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

// Example usage: Replace 'your-server.com' with the actual URL
fetchData('https://postgres://default:KH9cSNqk8OYt@ep-shy-sunset-a46gvpce-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require');

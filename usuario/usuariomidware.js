
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try{
    const jwtoken = req.headers.authorization.slice(7);
    console.log("jwt", jwtoken)
    if(!jwtoken){

      console.log('entra');
        return res.status(401).json({error: "No token"});
        
    }
    else{
    try {

      const payload = jwt.verify(jwtoken, 'Secret123')
      console.log("Desencriptado:", payload)
      req.nombre = payload.usernombre;
      console.log('gogogo');
      next();
    }
    catch(error) {
      console.log("error jwt",e)
      res.send("Error jwt")
    }}}
    catch(error){console.log()}
  };
  export default verifyToken;
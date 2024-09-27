
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try{
    const jwtoken = req.headers.authorization.slice(7);
    console.log("jwt", jwtoken)
    if(!jwtoken){
        return res.status(401).json({error: "No token"});
        
    }
    else{
    try {

      const payload = await jwt.verify(jwtoken, process.env.JWT_SECRET)
      console.log("Desencriptado:", payload)
      req.id=payload.userid
      next();
    }
    catch(error) {
      console.log("error jwt",e)
      res.send("Error jwt")
    }}}
    catch(error){console.log()}
  };
  
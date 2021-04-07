const jwt = require('jsonwebtoken');
const config = require('../config/configapi');
const Sugar = require('sugar');



const checktoken = (req,res,next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token){

        jwt.verify(token, config.secretkey, (err, decoded) => {
      if (err) {
        return res.json({
          valid: false,
          auth:false,
          message: 'Token is not valid'
        });
      } else {
      
            req.decoded = decoded;
            next();
  
      }
    });

    }else{
            return res.json({
            valid: false,
            auth:false,
            message: 'Auth token is not supplied'
            });
    }

   // console.log(token)
}

module.exports = {
  checktoken
}
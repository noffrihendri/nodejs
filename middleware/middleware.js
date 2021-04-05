const jwt = require('jsonwebtoken');


const checktoken = (req,res,next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


    console.log(token)
}

module.exports = checktoken
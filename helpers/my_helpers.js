let jwt = require("jsonwebtoken");
const config = require('../config/configapi');
const helper = {
   
    getuser: async (req,res) => {

        let token = req.headers['x-access-token'] || req.headers['authorization'];
        return await jwt.verify(token, config.secretkey);

    }

}

module.exports = helper;
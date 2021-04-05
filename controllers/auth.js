'use strict';
let jwt = require("jsonwebtoken");

const muser = require('../models/museradmin');


module.exports = {
  
  async login(req, res,next) {

     const { username, password } = req.body;
     console.log(username)
     console.log(password)

     if(typeof username!='undefined' && typeof password !='undefined'){

        const datauser = await muser.getAllUserAdmin([],{username:username,password:password});
        console.log(datauser);

     }else{
      res.status(200).json({valid:false, msg:'data undefined'});
     }


  }

}



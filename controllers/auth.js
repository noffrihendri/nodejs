'use strict';
let jwt = require("jsonwebtoken");

const Museradmin = require('../models/museradmin');
let md5 = require('md5');


module.exports = {
  
  async login(req, res,next) {

     const { username, password } = req.body;
    //  console.log(username)
    //  console.log(password)
  //  let  arrwhere={}
     if(typeof username!='undefined' && typeof password !='undefined'){

        let arrwhere = {
          username:username,
          password:password
        }
            
        //console.log(arrwhere)
        let data = await Museradmin.getAllUserAdmin([],arrwhere);

        if(data.length > 0 ){
          res.status(200).json({valid:true,auth: true,data:data}); 
        }else{
          res.status(200).json({valid:false,auth: false,msg:'Auth Failed, User Not Valid '}); 
        }
       

     }else{
      res.status(200).json({valid:false, msg:'data undefined'});
     }


  }

}



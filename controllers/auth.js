'use strict';
let jwt = require("jsonwebtoken");

const Museradmin = require('../models/museradmin');

const config = require('../config/configapi');
let md5 = require('md5');


module.exports = {
  
  async login(req, res,next) {

     const { username, password } = req.body;

     if(typeof username!='undefined' && typeof password !='undefined'){

        let arrwhere = {
          name:username,
          password:md5(password)
        }
            
        //console.log(arrwhere)
        let data = await Museradmin.getAllUserAdmin([],arrwhere);

       // console.log('hasilcontroller',data)


        if(data.length > 0 ){

          const expiredtoken = (Date.now()+1*24*60*60*1000) ; //1d

           const user = {
                           userid: data[0].id,
                           email : data[0].email,
                           name : data[0].name
                         };
            const jwtBearerToken = jwt.sign(user, config.secretkey, {
                expiresIn: '3d',
                subject: data[0].id.toString()
            });

              res.status(200).json({
                                  valid:true,
                                  auth: true,
                                  token: {expired:expiredtoken,token:jwtBearerToken, apihost:config.host},
                                  data: data[0]
                                }); 

      
        }else{
          res.status(200).json({valid:false,auth: false,msg:'Auth Failed, User Not Valid '}); 
        }
       

     }else{
      res.status(200).json({valid:false, msg:'data undefined'});
     }


  },

  logout: (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    jwt.destroy(token)

     res.status(200).json({
                                  valid:true,
                                  auth: true,
                                  message:'logout success'
                                }); 

  }

}



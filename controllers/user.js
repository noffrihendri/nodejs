
'use strict';


const muser = require('../models/museradmin');
let jwt = require("jsonwebtoken");
const config = require('../config/configapi');
const helper = require('../helpers/my_helpers');
const Museradmin = require('../models/museradmin');
let md5 = require('md5');


module.exports = {
    halo:(req, res,next)=> {
        
        res.status(200).json({
                                  valid:true,
                                  auth: true,
                                    message:'anda berhasil login'
                                }); 
    },

     getalluser: async (req, res,next)=> {
        let arrdata =[]

                let arrwhere=[]
            
                let user = await muser.getAllUserAdmin([],arrwhere)
               //console.log(user)
                if(user.length > 0){
                    arrdata = {
                        valid:true,
                        data:user
                    }
                }else{
                    arrdata = {
                        valid:false,
                        message:'user not found'
                    }
                }
      
        
        res.status(200).json(arrdata); 
    },

    adduser:async (req,res) => {
        let arrresult =[]
       
        let user = await helper.getuser(req);
        let body = req.body


        if(body > 0){

            let arrdata = {
                name:(body.name !== undefined) ? body.name :'',
                email:(body.email !== undefined) ? body.email :'',
                password:(body.password !== undefined) ? md5(body.password) :'',
                role_id:(body.role_id !== undefined) ? body.role_id :'',
                created_by:(user.name !== undefined) ? user.name :'',
                updated_by:(user.name !== undefined) ? user.name :'',
                created_at: new Date,
                updated_at: new Date
    
            }
    
            const result = await  muser.addData(arrdata)
            if(result > 0 ){
                  arrresult = {
                    valid:true,
                    message:'success'
                }
            }else{
                arrresult = {
                    valid:false,
                    message:'failed to insert'
                }
            }
        }else{  
              arrresult = {
                    valid:false,
                    message:'json cannot read'
                }
        }
        res.status(200).json(arrresult); 
   
    },

    updateuser: async (req,res) => {
        let arrresult =[]
        let body = req.body

        if(req.body.userid !== undefined){
                let arrwhere={
                    id:req.body.userid
                }
            
                let cekdata = await muser.getAllUserAdmin([],arrwhere)
                let user = await helper.getuser(req);
                if(cekdata.length > 0){
                    let arrupdate ={
                        name:(body.name !== undefined) ? body.name :'',
                        email:(body.email !== undefined) ? body.email :'',
                        password:(body.password !== undefined) ? md5(body.password) :'',
                        role_id:(body.role_id !== undefined) ? body.role_id :'',
                        updated_by:(user.name !== undefined) ? user.name :'',
                        updated_at: new Date
                    }

                    let result = await muser.editData(arrupdate,arrwhere);

                    if(result > 0){
                        arrresult = {
                            valid:true,
                            message:'update succes'
                        }
                    }else{
                         arrresult = {
                            valid:false,
                            message:'update failed'
                        }
                    }
                   // console.log('update',result);

                }else{
                    arrresult = {
                        valid:false,
                        message:'user not found'
                    }
                }

        }else{
              arrresult = {
                    valid:false,
                    message:'json cannot read'
              }
        }
        res.status(200).json(arrresult); 
    },

    destroy:async (req,res) => {
        let arrresult =[]
        let body = req.body
        if(req.body.userid !== undefined){

            let arrwhere = {
                id:req.body.userid
            }
            const data = await muser.deleteData(arrwhere)
           // console.log('delete',data)

            if(data > 0){
                    arrresult = {
                        valid:true,
                        message:'delete succes'
                      }
            }else{
                 arrresult = {
                         valid:false,
                        message:'delete failed'
                 }
            }
        }else{
              arrresult = {
                    valid:false,
                    message:'json cannot read'
              }
        }

        res.status(200).json(arrresult); 
    }







}
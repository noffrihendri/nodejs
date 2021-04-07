const db   = require('./coredb');
const dbconfig = {tablename:'users'}
const data = new db(); 

const Museradmin = {
    getAllUserAdmin(arrOrder=[],arrWhere=[], limit = 0,  offset = 0){
        return data.select("users.*,(select name from user_roles where user_roles.role_id=users.role_id) AS user_group,  '' as password ").getData(dbconfig,arrOrder,arrWhere,limit,offset); 
    },
    getUserAdminRow(arrWhere=[]){
        return data.getDataRow(dbconfig,arrWhere); 
    },
    addData(arrData = []){
        return data.addData(dbconfig,arrData);
    },
    editData(arrData = [], arrWhere = []){
        return data.editData(dbconfig,arrData,arrWhere);
    },
    deleteData(arrWhere = []){
        return data.deleteData(dbconfig,arrWhere);
    },
    getUserAdminLogin(arrOrder=[],arrWhere=[], limit = 0,  offset = 0){

        //console.log(arrWhere);
        return data.getData(dbconfig,arrOrder,arrWhere,limit,offset); 
    }
}

module.exports = Museradmin
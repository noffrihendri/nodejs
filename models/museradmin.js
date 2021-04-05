const db   = require('./coredb');
const dbconfig = {tablename:'useradmin'}
const data = new db(); 

const Museradmin = {
    getAllUserAdmin(arrOrder=[],arrWhere=[], limit = 0,  offset = 0){
        return data.select("useradmin.*,  '' as password ").getData(dbconfig,arrOrder,arrWhere,limit,offset); 
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
        return data.getData(dbconfig,arrOrder,arrWhere,limit,offset); 
    }
}

module.exports = Museradmin
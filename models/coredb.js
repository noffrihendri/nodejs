const pool = require('../config/database');
const Sugar =  require('sugar');

class dbModel {
    constructor(){
        this._clearParam(); 
    }
    
    async getData(arrConfigTable = [], arrOrder = [], arrwhere = [], limit=0, offset=0){
            try{    

                let arrWheres =   await this._getWhere(arrwhere); 
                let arrOrders =   await this._getOrder(arrOrder);
                let field     =   (typeof(this.selectx)=='undefined' || this.selectx==""  )?" * ":this.selectx;
                let strLimit  = ""; 
                if(limit>0){ strLimit = " Limit "+limit; }
                if(offset>0){ strLimit = strLimit + " Offset "+offset; }
                let join = this.joinx; 
                this._clearParam(); 
                console.log('select '+field+' from '+arrConfigTable.tablename +" "+join+' '+arrWheres.text+' '+arrOrders.text+strLimit)
                console.log(arrWheres.param)
                let data =   await pool.query('select '+field+' from '+arrConfigTable.tablename +" "+join+' '+arrWheres.text+' '+arrOrders.text+strLimit, arrWheres.param) 
                return data.rows;

            }catch(error){

                return []; 
            }

    }

    async getDataRow (arrConfigTable = [], arrwhere = []){
        try{
            let arrWheres =   await this._getWhere(arrwhere); 
            let join = this.joinx; 
            let data =   await pool.query('select count(*) as number  from '+arrConfigTable.tablename +' '+join+' '+arrWheres.text, arrWheres.param)
            this._clearParam();
            return new Promise((resolve)=> resolve(parseInt(data.rows[0].number)));
        }catch(error){
            return 0;
        }
    }

    async addData(arrConfigTable = [], arrData = []){
        try{
            let datafield = await this._getfield('public',arrConfigTable.tablename);
            let fieldName = Sugar.Object.values(Sugar.Object.map(datafield,'column_name'));
            let arrSavingDb = {}; 
            let arrKey = Sugar.Object.keys(arrData);
            let arrValue =  Sugar.Object.values(arrData);
            
            for (let index = 0; index < arrKey.length; index++) {
                
                let key = arrKey[index]; 
                let val = arrValue[index]; 
                let validField = Sugar.Array.findIndex(fieldName,key); 
                
                if(validField>-1){

                   
                    let numberType = ['integer','bigint','real','bigreal','int4','int8','float4','double','float8']; 
                    if(datafield[validField].is_nullable=="NO" && (datafield[validField].column_default==null || (datafield[validField].column_default).includes('nextval(')===false)){
                        
                        if(val!='' ){
                            
                            arrSavingDb[datafield[validField].column_name] = val;
                        }
                        else if(numberType.includes(datafield[validField].udt_name)){
                            arrSavingDb[datafield[validField].column_name] = (datafield[validField].column_default==null || datafield[validField].column_default=='')?0:datafield[validField].column_default ;
                        }else if(datafield[validField].udt_name=="timestamp"){
                            arrSavingDb[datafield[validField].column_name] = (datafield[validField].column_default==null || datafield[validField].column_default=='')?'0001-01-01 00:00:00':datafield[validField].column_default;
                        }
                        else{
                            
                            arrSavingDb[datafield[validField].column_name] = '-';
                        }
                    }else{
                        // console.log('sdsd')
                        if(datafield[validField].is_nullable=="YES"){
                            if(val=='' && ( numberType.includes(datafield[validField].udt_name) || datafield[validField].udt_name=="timestamp")){
                                arrSavingDb[datafield[validField].column_name] = null 
                            }else{
                                arrSavingDb[datafield[validField].column_name] = val; 
                            }
                        }else{
                            arrSavingDb[datafield[validField].column_name] = val;
                        }
                        
                    }
                }

                if((index+1)==Sugar.Object.size(arrData)){
                    if(Sugar.Object.size(arrSavingDb)>0){

                        if(fieldName.includes('createdate')) arrSavingDb['createdate'] 	= Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'); 
                        if(fieldName.includes('updatedate')) arrSavingDb['updatedate'] 	= Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'); 
                
                        let key = Sugar.Object.keys(arrSavingDb);
                        let val = Sugar.Object.values(arrSavingDb); 

                        let  arrstrBid =  Sugar.Array.map(val, (n,key) =>{
                            return "$"+(key+1);
                        });
                        let strBid = arrstrBid.join(',');
                        console.log('insert INTO '+arrConfigTable.tablename+' ('+key.join(',')+') VALUES('+strBid+')');
                        console.log(val);
                        let dt =  await pool.query('insert INTO '+arrConfigTable.tablename+' ('+key.join(',')+') VALUES('+strBid+')',val);
                        this._clearParam();
                        return new Promise((resolve)=>resolve(dt.rowCount),(error)=>{
                            console.log(error)
                            resolve(0);
                        }); 
                    }
                }else{
                }
            }
        }catch(error){
            return 0 ; 
        }
    }
   
    async editData(arrConfigTable = [], arrData = [], arrWhere = []){
        try{
            let datafield = await this._getfield('public',arrConfigTable.tablename);
            let fieldName = Sugar.Object.values(Sugar.Object.map(datafield,'column_name'));
            let arrSavingDb = {}; 
            let arrKey = Sugar.Object.keys(arrData);
            let arrValue =  Sugar.Object.values(arrData); 
            for (let index = 0; index < arrKey.length; index++) {

                let key = arrKey[index]; 
                let val = arrValue[index]; 
                let validField = Sugar.Array.findIndex(fieldName,key); 
                if(validField>-1){

                    let numberType = ['integer','bigint','real','bigreal','int4','int8','float4','double','float8']; 
                    if(datafield[validField].is_nullable=="NO" && (datafield[validField].column_default==null || (datafield[validField].column_default).includes('nextval(')===false)){
                        if(val!='' ){
                            arrSavingDb[datafield[validField].column_name] = val;
                        }
                        else if(numberType.includes(datafield[validField].udt_name)){
                            arrSavingDb[datafield[validField].column_name] = (datafield[validField].column_default==null || datafield[validField].column_default=='')?0:datafield[validField].column_default ;
                        }else if(datafield[validField].udt_name=="timestamp"){
                            arrSavingDb[datafield[validField].column_name] = (datafield[validField].column_default==null || datafield[validField].column_default=='')?'0001-01-01 00:00:00':datafield[validField].column_default;
                        }
                        else{
                            arrSavingDb[datafield[validField].column_name] = '';
                        }
                    }else{
                        arrSavingDb[datafield[validField].column_name] = val;
                    }
                }

                if((index+1)==Sugar.Object.size(arrData)){

                    if(Sugar.Object.size(arrSavingDb)>0){

                        if(fieldName.includes('updatedate')) arrSavingDb['updatedate'] 	= Sugar.Date.format(new Date(), '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'); 
                
                        let key = Sugar.Object.keys(arrSavingDb);
                        let val = Sugar.Object.values(arrSavingDb); 

                        let  arrstrBid =  Sugar.Array.map(key, (n,key) =>{
                            return n+"=$"+(key+1);
                        });
                        let strBid = arrstrBid.join(',');

                        let strWhere =await  this._getWhere(arrWhere,(val.length+1));
                        let param = Sugar.Array.append(val,strWhere.param);

                        console.log('UPDATE  '+arrConfigTable.tablename+' SET '+strBid+' '+strWhere.text);
                        console.log(param);

                        let dt = await pool.query('UPDATE  '+arrConfigTable.tablename+' SET '+strBid+' '+strWhere.text,param);
                        this._clearParam();
                        return new Promise((resolve)=>resolve(dt.rowCount),(error)=>{ console.log(error);  resolve(0)  }); 
                    }
                }
            }
        }catch(error){
            return 0
        }
    }

    async deleteData(arrConfigTable = [], arrWhere = []){
        try{
            let arrWheres =   await this._getWhere(arrWhere); 
            let data =   await pool.query('delete  from '+arrConfigTable.tablename +' '+arrWheres.text, arrWheres.param)
            this._clearParam();
            return new Promise((resolve)=> resolve(data.rowCount));
        }catch(error){
            return 0;
        }
    }

    async query(sql=""){
        try{    
            this._clearParam(); 
            let data =   await pool.query(sql) 
            return data.rows;
        }catch(error){
            return []; 
        }

    }

    async begintrans(){
        try{    
            this._clearParam(); 
            let data =   await pool.query('BEGIN') 
            return data;
        }catch(error){
            return []; 
        }
    }
    async comittrans(){
        try{    
            this._clearParam(); 
            let data =   await pool.query('COMMIT')
            console.log(data)
            return data;
        }catch(error){
            return []; 
        }
    }
    async rollback(){
        try{    
            this._clearParam(); 
            let data =   await pool.query('ROLLBACK')
            return data;
        }catch(error){
            return []; 
        }
    }



    join(text=""){
        this.joinx = this.joinx+" "+text; 
        return this
    }

    select(text=""){
        this.selectx = this.selectx+" "+text; 
        return this;
    }

    _clearParam(){
        this.joinx = ""; 
        this.selectx = "";
    }

    _getWhere(arrWhere = [],intPramstr = 1){
        
        return new Promise((resolve)=>{
            let res = {text:"", param:[]}
            if( Sugar.Object.size(arrWhere) > 0 ){
                let strWhere = ""; 
                let key = Sugar.Object.keys(arrWhere)
                let arrValue =  Sugar.Object.values(arrWhere)
                let WheVal = [];
                
                for (let index = 0; index < arrValue.length; index++) {
                    if(index!=0){ 
                        if( key[index].includes(' or')){
                            key[index] = Sugar.String.remove( key[index],' or');
                            strWhere = strWhere+' or '
                        }else{
                            strWhere = strWhere+' And '
                        }
                    }
                    if(key[index].includes('_sql')){
                        strWhere = strWhere+" "+arrValue[index];
                    }else{
                        strWhere = strWhere+" "+key[index]+"=$"+(index+intPramstr)+" ";
                        WheVal.push(arrValue[index]);
                    }
                    
                    if((index+1)==arrValue.length){
                        if(strWhere!=''){
                            strWhere = 'where '+strWhere; 
                        }
                        res.text = strWhere; 
                        res.param = WheVal; 
                        resolve(res); 
                    }
                }
            }else{
                resolve(res); 
            }
        }); 

    }
    _getOrder(arrOrder = []){
        return new Promise((resolve)=>{
            let res = {text:""}
            if( Sugar.Object.size(arrOrder) > 0 ){

                let strOrder = ""; 
                let key = Sugar.Object.keys(arrOrder)
                let arrValue =  Sugar.Object.values(arrOrder)
                
                for (let index = 0; index < arrValue.length; index++) {
                    if(index!=0){ strOrder = strOrder+', '}
                    strOrder = strOrder+" "+key[index]+" "+arrValue[index]+" ";
                    
                    if((index+1)==arrValue.length){
                        if(strOrder!=''){
                            strOrder = 'order by '+strOrder; 
                        }
                        res.text = strOrder; 
                        resolve(res); 
                    }
                }
            }else{
                resolve(res); 
            }
        })
        
    }
    
    async _getfield(schema="public", tableName=""){
        if(tableName.includes('.')){
            let arrTbl =  tableName.split('.')
            schema = arrTbl[0];
            tableName = arrTbl[1];
        }
        let sql = "SELECT column_name,data_type,column_default,is_nullable,udt_name  FROM information_schema.columns WHERE table_schema = '"+schema +"' AND table_name = '"+tableName+"'";
        let data = await pool.query(sql); 
        return data.rows; 
    }
    

}
module.exports = dbModel;

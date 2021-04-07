//use mysql database
const mysql = require('mysql');
const env = process.env;

const port = env.DB_PORT || '3307';
//konfigurasi koneksi
const dbConn = mysql.createConnection({
  host:  env.DB_HOST || 'localhost',
  user:  env.DB_USER ||'root',
  password:  env.DB_PASSWORD || '',
  port: port,
  database:  env.DB_NAME ||'nodejs'
});

dbConn.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!',port);
	}
});



dbConn.querybuilder = function(query){
  return new Promise(function(resolve, reject){
    dbConn.query(query, 
        function(err, rows){       
            
            //console.log('disinidatabase',rows)
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
				//console.log(rows);
                resolve(rows);
            }
        }
    )}
)}

module.exports = dbConn;
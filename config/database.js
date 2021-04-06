//use mysql database
const mysql = require('mysql');



//konfigurasi koneksi
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3307',
  database: 'nodejs'
});




dbConn.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

// async function querybuilder(sql) {

//   const results = await dbConn.execute(sql);
//   console.log('result',results);
//   //return results;
// }


// dbConn.querybuilder = function (query, result) {
//         dbConn.query(query, function (err, res) {             
//                 if(err) {
//                     console.log("error: ", err);
//                      return res;
//                 }
//                 else{
// 					console.log(res);
//                     return res;
// 					// result.send(res)
//                 }
//             });   
// };


// dbConn.querybuilder = async function(req, res) {

// 	let result ="";
//     let data = dbConn.query(req);
// 	console.log('ini',data.rows())
// 	return result
// };


dbConn.querybuilder = function(query){
  return new Promise(function(resolve, reject){
    dbConn.query(query, 
        function(err, rows){                                                
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
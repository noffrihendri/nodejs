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

module.exports = dbConn;
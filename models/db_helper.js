const mysql = require('mysql');
const config = require('../config');
const bd = config.database;
const connection = mysql.createConnection({
  host     : bd.host,
  user     : bd.user,
  password : bd.password,
  database : bd.database
});
 
module.exports = connection;
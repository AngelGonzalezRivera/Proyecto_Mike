var mysql = require('mysql');
var pool  = null;
exports.connect = function() {
  pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bdis'
  });
}
exports.get = function() {
  return pool;
}
/*var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'127.0.0.1',
  port: '3306',
  user:'root',
  password : '',
  database : 'bd_expogenios'
});

connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

module.exorts=connection;*/
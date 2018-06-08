var db=require('../db'); //reference of dbconnection.js

var curso={

getAllcursos:function(callback){

return db.get().query("Select * from curso",callback);

},
getcursoById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from curso where id LIKE ?",[id],callback);
},
addcurso:function(curso,callback){
return  db.get().query("Insert into curso values(?,?,?,?)",[null,curso.inicio,curso.fin,curso.status],callback);
},
deletecurso:function(id,callback){
 return  db.get().query("delete from curso where id=?",[id],callback);
},
updatecurso:function(id,curso,callback){
 return  db.get().query("update curso set inicio=?,fin=? where id=?",[curso.inicio,curso.fin,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update curso set status=? where id=?', [status,id],callback);
}
};
module.exports=curso;
var db=require('../db'); //reference of dbconnection.js

var jefe_de_grupo={

getAlljefe_de_grupos:function(callback){

return db.get().query("Select * from jefe_de_grupo",callback);

},
getjefe_de_grupoById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from jefe_de_grupo where id LIKE ?",[id],callback);
},
addjefe_de_grupo:function(jefe_de_grupo,callback){
return  db.get().query("Insert into jefe_de_grupo values(?,?,?,?,?)",[null,jefe_de_grupo.nombre,jefe_de_grupo.apellido,jefe_de_grupo.id_grupo,jefe_de_grupo.id_user],callback);
},
deletejefe_de_grupo:function(id,callback){
 return  db.get().query("delete from jefe_de_grupo where id=?",[id],callback);
},
updatejefe_de_grupo:function(id,jefe_de_grupo,callback){
 return  db.get().query("update jefe_de_grupo set id_grupo=?,nombre=?,apellido=?,id_user=? where id=?",[jefe_de_grupo.id_grupo,jefe_de_grupo.nombre,jefe_de_grupo.apellido,jefe_de_grupo.id_user,id],callback);
}
};
module.exports=jefe_de_grupo;
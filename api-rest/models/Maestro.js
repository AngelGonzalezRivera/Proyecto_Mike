var db=require('../db'); //reference of dbconnection.js

var maestro={

getAllmaestros:function(callback){

return db.get().query("Select * from maestro",callback);

},
getmaestroById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from maestro where id LIKE ?",[id],callback);
},
addmaestro:function(maestro,callback){
return  db.get().query("Insert into maestro values(?,?,?,?,?)",[null,maestro.nombre,maestro.apellido,'A',maestro.id_user],callback);
},
deletemaestro:function(id,callback){
 return  db.get().query("delete from maestro where id=?",[id],callback);
},
updatemaestro:function(id,maestro,callback){
 return  db.get().query("update maestro set nombre=?,apellido=?,id_user=? where id=?",[maestro.nombre,maestro.apellido,maestro.id_user,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update maestro set status=? where id=?', [status,id],callback);
}
};
module.exports=maestro;
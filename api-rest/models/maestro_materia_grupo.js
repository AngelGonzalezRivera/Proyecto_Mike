var db=require('../db'); //reference of dbconnection.js

var maestro_materia_grupo={

getAllmaestro_materia_grupos:function(callback){

return db.get().query("Select * from maestro_materia_grupo",callback);

},
getmaestro_materia_grupoById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from maestro_materia_grupo where id LIKE ?",[id],callback);
},
addmaestro_materia_grupo:function(maestro_materia_grupo,callback){
return  db.get().query("Insert into maestro_materia_grupo values(?,?,?,?,?)",[null,maestro_materia_grupo.id_maestro,maestro_materia_grupo.id_materia,maestro_materia_grupo.id_grupo,maestro_materia_grupo.status],callback);
},
deletemaestro_materia_grupo:function(id,callback){
 return  db.get().query("delete from maestro_materia_grupo where id=?",[id],callback);
},
updatemaestro_materia_grupo:function(id,maestro_materia_grupo,callback){
 return  db.get().query("update maestro_materia_grupo set id_maestro=?,id_materia=?,id_grupo=?,status=? where id=?",[maestro_materia_grupo.id_maestro,maestro_materia_grupo.id_materia,maestro_materia_grupo.id_grupo,maestro_materia_grupo.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update maestro_materia_grupo set status=? where id=?', [status,id],callback);
}
};
module.exports=maestro_materia_grupo;
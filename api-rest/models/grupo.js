var db=require('../db'); //reference of dbconnection.js

var grupo={

getAllgrupos:function(callback){

return db.get().query("Select * from grupo",callback);

},
getgrupoById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from grupo where id LIKE ?",[id],callback);
},
addgrupo:function(grupo,callback){
return  db.get().query("Insert into grupo values(?,?,?,?,?)",[null,grupo.generacion,grupo.grupo,grupo.id_semestre,grupo.status],callback);
},
deletegrupo:function(id,callback){
 return  db.get().query("delete from grupo where id=?",[id],callback);
},
updategrupo:function(id,grupo,callback){
 return  db.get().query("update grupo set generacion=?,grupo=?,id_semestre=?,status=? where id=?",[grupo.generacion,grupo.grupo,grupo.id_semestre,grupo.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update grupo set status=? where id=?', [status,id],callback);
}
};
module.exports=grupo;
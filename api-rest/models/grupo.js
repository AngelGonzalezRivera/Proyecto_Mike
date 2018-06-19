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
return  db.get().query("Insert into grupo values(?,?,?,?,?)",[null,grupo.generation,grupo.grupo,grupo.id_semestre,'A'],callback);
},
deletegrupo:function(id,callback){
 return  db.get().query("delete from grupo where id=?",[id],callback);
},
updategrupo:function(id,grupo,callback){
 return  db.get().query("update grupo set generation=?,grupo=?,id_semestre=? where id=?",[grupo.generation,grupo.grupo,grupo.id_semestre,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update grupo set status=? where id=?', [status,id],callback);
}
};
module.exports=grupo;

var db=require('../db'); //reference of dbconnection.js

var tema={

getAlltemas:function(callback){

return db.get().query("Select * from tema",callback);

},
gettemaById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from tema where id LIKE ?",[id],callback);
},
addtema:function(tema,callback){
return  db.get().query("Insert into tema values(?,?,?,?,?,?)",[null,tema.descripcion,tema.id_materia,tema.sub,tema.indice,tema.status],callback);
},
deletetema:function(id,callback){
 return  db.get().query("delete from tema where id=?",[id],callback);
},
updatetema:function(id,tema,callback){
 return  db.get().query("update tema set descripcion=?,id_materia=?,sub=?,indice=?,status=? where id=?",[tema.descripcion,tema.id_materia,tema.sub,tema.indice,tema.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update tema set status=? where id=?', [status,id],callback);
}
};
module.exports=tema;
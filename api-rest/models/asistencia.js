var db=require('../db'); //reference of dbconnection.js

var asistencia={

getAllasistencias:function(callback){

return db.get().query("Select * from asistencia",callback);

},
getasistenciaById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from asistencia where id LIKE ?",[id],callback);
},
addasistencia:function(asistencia,callback){
return  db.get().query("Insert into asistencia values(?,?,?,?)",[null,asistencia.id_maestro,asistencia.fecha,'A'],callback);
},
deleteasistencia:function(id,callback){
 return  db.get().query("delete from asistencia where id=?",[id],callback);
},
updateasistencia:function(id,asistencia,callback){
 return  db.get().query("update asistencia set id_maestro=?,fecha=?,asistio=? where id=?",[asistencia.id_maestro,asistencia.fecha,asistencia.asistio,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update asistencia set asistio=? where id=?', [asistio,id],callback);
}
};
module.exports=asistencia;
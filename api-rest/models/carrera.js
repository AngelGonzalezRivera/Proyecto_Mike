var db=require('../db'); //reference of dbconnection.js

var carrera={

getAllcarreras:function(callback){

return db.get().query("Select * from carrera",callback);

},
getcarreraById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from carrera where id LIKE ?",[id],callback);
},
addcarrera:function(carrera,callback){
    return db.get().query("Insert into carrera values(?,?,?)", [carrera.nombre, carrera.status, null],callback);
},
deletecarrera:function(id,callback){
 return  db.get().query("delete from carrera where id=?",[id],callback);
},
updatecarrera:function(id,carrera,callback){
 return  db.get().query("update carrera set nombre=?,status=?, where id=?",[carrera.nombre,carrera.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update carrera set status=? where id=?', [status,id],callback);
}
};
module.exports=carrera;
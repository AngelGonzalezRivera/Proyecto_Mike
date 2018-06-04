var db=require('../db'); //reference of dbconnection.js

var plan={

getAllplans:function(callback){

return db.get().query("Select * from plan_estudios",callback);

},
getplanById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from plan_estudios where id LIKE ?",[id],callback);
},
addplan:function(plan,callback){
    return db.get().query("Insert into plan_estudios values(?,?,?,?,?)", [null, plan.id_carrera, plan.id_curso, plan.id_maestro,plan.status],callback);
},
deleteplan:function(id,callback){
 return  db.get().query("delete from plan_estudios where id=?",[id],callback);
},
updateplan:function(id,plan,callback){
    return db.get().query("update plan_estudios set id_carrera=?,id_curso=?,status=?,id_maestro=? where id=?", [plan.id_carrera, plan.id_curso, plan.status, plan.id_maestro,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update plan_estudios set status=? where id=?', [status,id],callback);
}
};
module.exports=plan;
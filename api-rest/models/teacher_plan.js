var db=require('../db'); //reference of dbconnection.js

var teacher_plan={

getAllteacher_plans:function(callback){

return db.get().query("Select * from teacher_plan",callback);

},
getteacher_planById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from teacher_plan where id LIKE ?",[id],callback);
},
addteacher_plan:function(teacher_plan,callback){
return  db.get().query("Insert into teacher_plan values(?,?,?,?,?)",[null,teacher_plan.id_mmg,teacher_plan.created,teacher_plan.status, teacher_plan.status_plan],callback);
},
deleteteacher_plan:function(id,callback){
 return  db.get().query("delete from teacher_plan where id=?",[id],callback);
},
updateteacher_plan:function(id,teacher_plan,callback){
 return  db.get().query("update teacher_plan set id_mmg=?,created=?,status=?,status_plan=? where id=?",[teacher_plan.id_mmg,teacher_plan.created,teacher_plan.status,teacher_plan.status_plan,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update teacher_plan set status=? where id=?', [status,id],callback);
}
};
module.exports=teacher_plan;
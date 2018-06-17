var db=require('../db'); //reference of dbconnection.js

var teacher_tema_times={

getAllteacher_tema_times:function(callback){

return db.get().query("Select * from teacher_tema_times",callback);

},
getteacher_tema_timesById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from teacher_tema_times where id LIKE ?",[id],callback);
},
addteacher_tema_times:function(teacher_tema_times,callback){
return  db.get().query("Insert into teacher_tema_times values(?,?,?,?,?,?,?,?)",[null,teacher_tema_times.id_tema,teacher_tema_times.id_teacher_plan,teacher_tema_times.finalized_real,teacher_tema_times.init_real,teacher_tema_times.init,teacher_tema_times.final,teacher_tema_times.status],callback);
},
deleteteacher_tema_times:function(id,callback){
 return  db.get().query("delete from teacher_tema_times where id=?",[id],callback);
},
updateteacher_tema_times:function(id,teacher_tema_times,callback){
 return  db.get().query("update teacher_tema_times set id_tema=?,id_teacher_plan=?,finalized_real=?,init_real=?,init=?,final=?,status=? where id=?",[teacher_tema_times.id_tema,teacher_tema_times.id_teacher_plan,teacher_tema_times.finalized_real,teacher_tema_times.init_real,teacher_tema_times.init,teacher_tema_times.final,teacher_tema_times.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update teacher_tema_times set status=? where id=?', [status,id],callback);
}
};
module.exports=teacher_tema_times;
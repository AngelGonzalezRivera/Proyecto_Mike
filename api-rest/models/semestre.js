var db=require('../db'); //reference of dbconnection.js

var semestre={

getAllsemestres:function(callback){

return db.get().query("Select * from semestre",callback);

},
getsemestreById:function(id,callback){
id='%'+id+'%';
return  db.get().query("select * from semestre where id LIKE ?",[id],callback);
},
addsemestre:function(semestre,callback){
return  db.get().query("Insert into semestre values(?,?,?,?,?)",[null,semestre.semestre,semestre.from,semestre.to,semestre.status],callback);
},
deletesemestre:function(id,callback){
 return  db.get().query("delete from semestre where id=?",[id],callback);
},
updatesemestre:function(id,semestre,callback){
 return  db.get().query("update semestre set semestre=?,from=?,to=?,status=? where id=?",[semestre.semestre,semestre.from,semestre.to,semestre.status,id],callback);
},
updateStatus:function(id,status, callback){
    return  db.get().query('update semestre set status=? where id=?', [status,id],callback);
}
};
module.exports=semestre;
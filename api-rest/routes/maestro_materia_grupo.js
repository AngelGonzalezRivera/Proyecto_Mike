var express = require('express');
var router = express.Router();
var maestro_materia_grupo=require('../models/maestro_materia_grupo');

router.get('/:id?',function(req,res,next){

if(req.params.id){

maestro_materia_grupo.getmaestro_materia_grupoById(req.params.id,function(err,rows){
if(err)
 {
 res.json(err);
 }
 else{
 res.json(rows);
 }
 });
}
else{

maestro_materia_grupo.getAllmaestro_materia_grupos(function(err,rows){

if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(rows);
 }

});
}
});
router.post('/',function(req,res,next){

maestro_materia_grupo.addmaestro_materia_grupo(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:id',function(req,res,next){

maestro_materia_grupo.deletemaestro_materia_grupo(req.params.id,function(err,count){

if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(count);
 }

});
});
router.put('/changeStatus/:id/:status',function(req,res,next){
    maestro_materia_grupo.updateStatus(req.params.id,req.params.status,function(err,rows){
    if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
        });
});
router.put('/:id',function(req,res,next){

maestro_materia_grupo.updatemaestro_materia_grupo(req.params.id,req.body,function(err,rows){

if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(rows);
 }
 });
});
module.exports=router;
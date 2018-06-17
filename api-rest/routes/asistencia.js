var express = require('express');
var router = express.Router();
var asistencia=require('../models/asistencia');

router.get('/:id?',function(req,res,next){

if(req.params.id){

asistencia.getasistenciaById(req.params.id,function(err,rows){
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

asistencia.getAllasistencias(function(err,rows){

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

asistencia.addasistencia(req.body,function(err,count){
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

asistencia.deleteasistencia(req.params.id,function(err,count){

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
    asistencia.updateStatus(req.params.id,req.params.status,function(err,rows){
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

asistencia.updateasistencia(req.params.id,req.body,function(err,rows){

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
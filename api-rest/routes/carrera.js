var express = require('express');
var router = express.Router();
var carrera=require('../models/carrera');

router.get('/:id?',function(req,res,next){

if(req.params.id){

carrera.getcarreraById(req.params.id,function(err,rows){
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

carrera.getAllcarreras(function(err,rows){

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

carrera.addcarrera(req.body,function(err,count){
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

carrera.deletecarrera(req.params.id,function(err,count){

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
    carrera.updateStatus(req.params.id,req.params.status,function(err,rows){
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

carrera.updatecarrera(req.params.id,req.body,function(err,rows){

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
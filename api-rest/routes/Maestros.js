var express = require('express');
var router = express.Router();
var Maestro=require('../models/Maestro');

router.get('/:id?',function(req,res,next){

if(req.params.id){

Maestro.getmaestroById(req.params.id,function(err,rows){
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

Maestro.getAllmaestros(function(err,rows){

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

Maestro.addmaestro(req.body,function(err,count,result){
 if(err)
 {
 res.json(err);
 }
 else{
    result.status=201;
    res.json(result);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:id',function(req,res,next){

Maestro.deletemaestro(req.params.id,function(err,count){

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
    Maestro.updateStatus(req.params.id,req.params.status,function(err,rows){
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

Maestro.updatemaestro(req.params.id,req.body,function(err,rows){

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
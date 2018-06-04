var express = require('express');
var router = express.Router();
var plan=require('../models/plan');

router.get('/:id?',function(req,res,next){

if(req.params.id){

plan.getplanById(req.params.id,function(err,rows){
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

plan.getAllplans(function(err,rows){

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

plan.addplan(req.body,function(err,count){
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

plan.deleteplan(req.params.id,function(err,count){

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
    plan.updateStatus(req.params.id,req.params.status,function(err,rows){
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

plan.updateplan(req.params.id,req.body,function(err,rows){

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
var express = require('express');
var router = express.Router();
var teacher_tema_times=require('../models/teacher_tema_times');

router.get('/:id?',function(req,res,next){

if(req.params.id){

teacher_tema_times.getteacher_tema_timesById(req.params.id,function(err,rows){
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

teacher_tema_times.getAllteacher_tema_times(function(err,rows){

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

teacher_tema_times.addteacher_tema_times(req.body,function(err,count){
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

teacher_tema_times.deleteteacher_tema_times(req.params.id,function(err,count){

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
    teacher_tema_times.updateStatus(req.params.id,req.params.status,function(err,rows){
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

teacher_tema_times.updateteacher_tema_times(req.params.id,req.body,function(err,rows){

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
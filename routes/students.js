var express = require('express');
var router = express.Router();
Class = require('../models/class')
Student= require('../models/student')
User = require('../models/user')

router.get('/classes',ensureAuthenticated, function(req, res, next) {
  Student.getStudentByUsername(req.user.username,function(err,student){
    if(err){
      console.error(error)
      res.send(err)
    }else{
      res.render('student/classes',{"student":student})
    }
  })
});

router.post('/classes/register', function(req,res){
    info = []
    info['student_username'] = req.user.username
    info['class_id'] = req.body.class_id
    info['class_title'] = req.body.class_title
    Student.register(info, function(err,student){
        if(err) throw err
        console.log(student)
    })
    req.flash('success','you are now registered')
    req.redirect('/students/classes')
})
function ensureAuthenticated(req,res,next){
    if(req.IsAuthenticated()){
      return next()
    }
    res.redirect('/')
  }
module.exports = router;

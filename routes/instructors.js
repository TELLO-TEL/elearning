var express = require('express');
var router = express.Router();
Class = require('../models/class')
Instructor= require('../models/instructor')
User = require('../models/user')

router.get('/classes',ensureAuthenticated, function(req, res, next) {
  Instructor.getInstructorByUsername(req.user.username,function(err,instructor){
    if(err){
      console.error(error)
      res.send(err)
    }else{
      res.render('instructor/classes',{"instructor":instructor})
    }
  })
});

router.post('/classes/register', function(req,res){
    info = []
    info['instructor_username'] = req.user.username
    info['class_id'] = req.body.class_id
    info['class_title'] = req.body.class_title
    Instructor.register(info, function(err,instructor){
        if(err) throw err
        console.log(instructor)
    })
    req.flash('success','you are now registered  to teaxh this class')
    req.redirect('/instructors/classes')
})
function ensureAuthenticated(req,res,next){
    if(req.IsAuthenticated()){
      return next()
    }
    res.redirect('/')
  }

  
router.get('/classes/:id/lessons/new',ensureAuthenticated, function(req, res, next) {
res.render('instructors/newlesson',{'class_id':req.param.id})
});
router.post('/classes/:id/lessons/new',ensureAuthenticated, function(req, res, next) {
var indo = []

  info[ 'class_id'] = req.param.id
info['lesson_number'] = req.body.lesson_number
info['lesson_title'] = req.body.lesson_title
info['lesson_body'] = req.body.lesson_body

Class.addLesson(info, function(err,lessno){
  console.log('lesson added')
})
req.flash('success','Lesson Added')
res.redirect('/instructors/classes')
  });
module.exports = router;

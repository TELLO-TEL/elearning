var express = require('express');
var router = express.Router();
Class = require('../models/class')
/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function(err,classes){
    if(err){
      console.error(error)
    }else{
      res.render('classes/index',{'classes':classes})
    }
  },3)
});

router.get('/:id/details', function(req, res, next) {
  Class.getClassById([req.params.id],function(err,classname){
    if(err){
      console.error(err)
    }else{
      res.render('classes/details',{'class':classname})
    }
  })
});


router.get('/:id/lessons', function(req, res, next) {
  Class.getClassById([req.params.id],function(err,classname){
    if(err){
      console.error(err)
    }else{
      res.render('classes/lessons',{'class':classname})
    }
  })
});
router.get('/:id/lessons/:lesson_id', ensureAuthenticated,function(req, res, next) {
  Class.getClassById([req.params.id],function(err,classname)
  {

    var lesson;
    if(err){
      console.error(err)
      res.send(err)
    }else{
     for(i=0;i<classname.lessons.length;i++){
       if(classname.lessons[i].lesson_number ==req.param.lesson_id){
         lesson = classname.lesson[i]
       }
     }
     es.render('classes/lesson', {"class":classname,"lesson":lesson})
    }
  })
}); 

function ensureAuthenticated(req,res,next){
  if(req.IsAuthenticated()){
    return next()
  }
  res.redirect('/')
}
module.exports = router;

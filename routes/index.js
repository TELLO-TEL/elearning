var express = require('express');
var router = express.Router();
Class = require('../models/class')
/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses(function(err,classes){
    if(err){
      console.error(error)
    }else{
      res.render('index',{'classes':classes})
    }
  },3)
});

module.exports = router;

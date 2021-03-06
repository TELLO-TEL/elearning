var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
var Student = require('../models/student')
var Instructor = require('../models/instructor')
async = require('async')
/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render('users/signup')
});


router.post('/signup', function (req, res, next) {
  //req form params
  var first_name = req.body.first_name
  var last_name = req.body.last_name
  var email = req.body.email
  var username = req.body.username
  var password = req.body.password
  var password2 = req.body.password2
  var type = req.body.type
  //fprm filed validation
  req.checkBody('first_name', 'first name is needed').notEmpty()
  req.checkBody('last_name', 'last name is needed').notEmpty()
  req.checkBody('username', 'username is needed').notEmpty()
  req.checkBody('email', 'email needed').notEmpty()
  req.checkBody('email', 'email name is needed').isEmail()
  req.checkBody('password', 'password is needed').notEmpty()
  req.checkBody('password2',  'password have to match').equals(req.body.password)
  var errors = req.validationErrors()
  if (errors) {
    res.render('users/signup', {
      errors: errors,
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      password2: password2

    })
  } else {
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type: type
    })
    var newStudent = new Student({
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username
    })
    var newInstructor = new Instructor({
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username
    })
    if (type == 'student') {
      User.saveStudent(newUser, newStudent, function (err, user) {
        console.log("student created")

      }) 

    } else {
      User.saveInstructor(newUser, newInstructor, function (err, user) {
        console.log("Instructor created")

      })

    }
    req.flash('success', 'User added');
    res.redirect('/')   
  }
})
passport.serializeUser(function(user,done) {
  done(null,user._id)
  
})
passport.deserializeUser(function(id,done){
  User.getUserById(id,function(err,user){
    done(err,user)
  })
})
 router.post('/login',passport.authenticate('local',
 {failureRedirect:'/',failureFlash:"wrong username of passoword"}),
 function(req,res){
   req.flash('success',"you are now login in")
   var usertype= req.user.type

   res.redirect('/'+usertype+'s/classes')
 })
passport.use(new LocalStrategy(
  function(username,password,done){
    User.getUserByUsername(username,function(err,user){
      if (err)throw err
      if(!user) {
        return done(null,false,{message:"unkown user"+ username})
      }
      User.comparePassword(password,user.password,function(err,isMatch){
        if(isMatch){
          return done(null,user)
        }else{
          console.log('invalid password')
          return done(null,false ,{message:'invalid password'})
        }
      })
    })
  }
))

  router.get('/logout',function(req,res){
    req.logout();
    req.flash('success',"you have logged out")
    res.redirect('/')

  })

  function ensureAuthenticated(req,res,next){
    if(req.IsAuthenticated()){
      return next()
    }
    res.redirect('/')
  }
module.exports = router;

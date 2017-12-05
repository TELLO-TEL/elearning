var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var userSchema = mongoose.Schema({
    username: {type:String},
    email:{type:String},
    password:{
        type:String,
        bcrypt:true
    },
type:{type:String}
  
})

var User = module.exports =mongoose.model('User',userSchema)
module.exports.getUserById = function(callback,id){
    User.findById(id,callback)


 
}
   //fetch single class
   module.exports.getUserByUsername =function(username,callback){ 
    var query = {username:username}
     User.findOne(query,callback)
}

//save  sstudent

module.exports.saveStudent = function(newUser,newStudent, callback){
bcrypt.hash(newUser.password,10,function(err,hash){
    if (err) throw err
    newUser.password = hash;
    console.log('student saved successfully') 
    async.parallel([newUser.save,newStudent.save], callback)
})

}

//save instructor
module.exports.saveInstructor= function(newUser,newInstructor, callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if (err) throw err
        newUser.password = hash;
        console.log('instructor saved successfully') 
        async.parallel([newUser.save,newInstructor.save], callback)
    })
    
    }
    //compare passwords

    module.exports.comparePassword = function(candidatePassword ,hash ,callback){
        bcrypt.compare(candidatePassword,hash,function(error,isMatch){
            if (error) throw error
            callback(null, isMatch )
        })
    }
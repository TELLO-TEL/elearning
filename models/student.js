var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    first_name: {type:String},
    last_name:{type:String},
    username: {type:String},
    email:{type:String},
     classes:[{
        class_id:{
            type:[mongoose.Schema.Types.ObjectId]
        },
        class_title:{type:String}
    }]
    
    
    
})

var Student = module.exports =mongoose.model('Student',studentSchema)
module.exports.getStudentByUsername = function(Username,callback){
    
    var query ={username:username}
    Student.findOne(query,callback)


    //fetch single class
    
}

module.exports.register = function(info , callback){
    student_username = info['student_username']
    class_id = info['class_id']
    class_title = info['class_title']

    var query ={username:student_username}
    Student.findByOneAndUpdate(
        query,
        {$push:{'classes':{class_id:class_id,
                            class_title:class_title}}},
        {safe:true,upset:true},
        callback
    )
}
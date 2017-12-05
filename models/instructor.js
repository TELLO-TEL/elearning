var mongoose = require('mongoose');
var instructorSchema = mongoose.Schema({
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

var Instructor = module.exports =mongoose.model('Instructor',instructorSchema)


    module.exports.getInstructorByUsername = function(username,callback){
        
        var query ={username:username}
        Instructor.findOne(query,callback)
    
    
        //fetch single class
        
    }
    
    module.exports.register = function(info , callback){
        instructor_username = info['instructor_username']
        class_id = info['class_id']
        class_title = info['class_title']
    
        var query ={username:instructor_username}
        Instructor.findByOneAndUpdate(
            query,
            {$push:{'classes':{class_id:class_id,
                                class_title:class_title
                            }}},
            {safe:true,upset:true},
            callback
        )
    }
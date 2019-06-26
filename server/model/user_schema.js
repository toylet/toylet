const Schema = {};

Schema.createSchema = function(mongoose){
    
    const UserSchema = mongoose.Schema({
        email : {type:String, index:"hashed", required:true, unique:true},
        password : {type:String, type:String, required:true},
        name : {type:String, required: true},
        average_working_time : [{type:Date}],
        job : {type:String, 'default':''},
        company : {type:String, 'default':''},
        comment : {type:String, 'default':''},
        language : [{type:String}],
        link : {type:String}
    });

    UserSchema.path('email').validate((email)=>{
        return email.lenghth;
    }, 'have no email');

    

    return UserSchema;

}

module.exports = Schema;
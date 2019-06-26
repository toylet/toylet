const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : {type:String, index:"hashed", required:true, unique:true},
    password : {type:String, type:String, required:true},
    name : {type:String, required: true},
    average_working_time : [{type:Date}],
    job : {type:String, 'default':''},
    company : {type:String, 'default':''},
    language : [{type:String, 'default':'English'}],
    link : {type:String}
});

UserSchema.path('email').validate((email)=>{
    return email.lenghth;
}, 'have no email');

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
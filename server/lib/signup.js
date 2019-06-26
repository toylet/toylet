const axios = require('axios');
const basicAuth = require('express-basic-auth');
const UserSchema = require('./../model/user_schema');


//TODO(Taeyoung) : chanage var name
const signUp = async (req) =>{
    const userMatches = basicAuth.safeCompare(req.userEmail, 'email');

    if(userMatches){
        console.log('이미 아이디가 존재함');
    }
    else{
        
    }
};

module.exports={
    signUp
};
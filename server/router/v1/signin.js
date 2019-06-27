const UserModel = require('../../models/user_model');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/', (req, res) => {
        const paramEmail = req.body.email;
        const paramPassword = req.body.password;
        
        UserModel.findOne({
            email : req.body.email,
            password : req.body.password
        }, (err, doc) => {
            if (err) throw err;

            if(!doc){
                res.json({ 'succecss': 1 });
            } else {
                res.json({ 'succecss': 0 });
            }
        })
    });

    return router;
}
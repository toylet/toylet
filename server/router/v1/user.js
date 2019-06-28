const UserModel = require('../../models/user');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const UPLOAD_DIR = './uploads/profile';

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    // signin
    router.post('/login', (req, res) => {
        UserModel.findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, doc) => {
            if (err) throw err;

            if (!doc) {
                res.json({ 'succecss': true });
            } else {
                res.json({ 'succecss': false });
            }
        })
    });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_DIR);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const profileImageUpload = multer({ storage });

    // signup
    router.post('/register', profileImageUpload.single('profileImage'), (req, res) => {
        console.log(req.file.path);
        UserModel.find({
            email: req.body.email
        }, (err, docs) => {
            if (err) throw err;

            if (docs.length == 0) {
                // User 정보 없으면 생성
                const newUser = new UserModel({
                    'email': req.body.email,
                    'password': req.body.password,
                    'name': req.body.name,
                    'job': req.body.job,
                    'language': req.body.language,
                    'link': req.body.link,
                    'profileImageLink': req.file.path
                });
                newUser.save((err) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ 'succecss': 1 });
                });
            } else {
                //duplicate user data
                console.log('duplicate data');
                res.json({ 'success': 0 });
            }
        });
    });

    return router;
}
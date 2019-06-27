const UserModel = require('../../models/user_model');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const UPLOAD_DIR = './server/uploads/profile';

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_DIR);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    const profileImageUpload = multer({
        storage
    });

    router.post('/', profileImageUpload.single('profileImage'), (req, res) => {
        console.log(req.file.path); // file path

        UserModel.find({
            email : req.body.email
        }, (err, docs)=>{
          if (err) throw err;
          
          if(docs.length == 0){
              /* User 정보 없으면 생성 */
            const newUser = new UserModel({
                'email' : req.body.email,
                'password' : req.user.password,
                'name' : req.body.name,
                'average_working_time': req.body.WT,
                'job' : req.body.job,
                'company' : req.body.company,
                'language' : req.body.language,
                'link' : req.body.link,
                'profileImageLink' : req.file.path
            });

            newUser.save((err)=>{
                if(err) throw err;

                res.json({'succecss':1});
            });
          } else {
              res.json({'success':0});
          }

        })
    });


    return router;
}
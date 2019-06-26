// const model = require('../../model');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const UPLOAD_DIR = './server/uploads/profile';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const profileImageUpload = multer({ storage });

router.post('/', profileImageUpload.single('profileImage'), (req, res) => {
    res.json({ msg: 'upload success' });
    console.log(req.file.path); // file path
    //TODO(Taeyoung) : Save file with user data here
});

module.exports = router;
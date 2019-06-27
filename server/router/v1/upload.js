const express = require('express');
const router = express.Router();
const multer = require('multer');
const UPLOAD_DIR = './uploads/img';

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_DIR);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const imageUpload = multer({ storage });

    router.post('/', imageUpload.single('img'), (req, res) => {
        res.json({url: req.file.path});
    })

    return router;
}
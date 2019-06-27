const ProjectModel = require('../../models/project');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/makeProject', (req, res) => {
        //implement makeProject function here
    });

    router.get('/showProject', (req, res) => {
        //implement showProject function here
    });

    return router;
}
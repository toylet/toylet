// const model = require('../../model');
const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
    router.use((res, req, next) => {
        next();
    });

    router.post('/', (req, res) => {
        // implement sign in function here
        console.log('sign in');
        res.send('sign in');
    });

    return router;
}
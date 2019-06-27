const express = require('express');
const router = express.Router();
const config = require('./../config/config.json');
const version = config.version;

module.exports = () => {
    const signUp = require('./' + version + '/signup')();
    const signIn = require('./' + version + '/signin')();
    router.use((req, res, next) => {
        next();
    });

    router.use('/' + version + '/signup', signUp);
    router.use('/' + version + '/signin', signIn);

    return router;
}
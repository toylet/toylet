const express = require('express');
const router = express.Router();
const config = require('./../config/config.json');
const version = config.version;

module.exports = () => {
    const user = require('./' + version + '/user')();
    // const signUp = require('./' + version + '/signup')();
    // const signIn = require('./' + version + '/signin')();
    const project = require('./' + version + '/project')();
    router.use((req, res, next) => {
        next();
    });

    //TODO(Taeyoung): change user API
    router.use('/' + version + '/user', user);
    // router.use('/' + version + '/signup', signUp);
    // router.use('/' + version + '/signin', signIn);
    router.use('/' + version + '/project', project);

    return router;
}
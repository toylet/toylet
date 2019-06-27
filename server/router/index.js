const express = require('express');
const router = express.Router();
const config = require('./../config/config.json');
const version = config.version;

module.exports = () => {
    const user = require('./' + version + '/user')();
    const project = require('./' + version + '/project')();
    const map = require('./' + version + '/map')();
    const gitloader = require('./' + version + '/gitloader')();
    router.use((req, res, next) => {
        next();
    });

    router.use('/' + version + '/user', user);
    router.use('/' + version + '/project', project);
    router.use('/' + version + '/map', map);
    router.use('/' + version + '/gitloader', gitloader);

    return router;
}
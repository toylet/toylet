const express = require('express');
const router = express.Router();
const config = require('./../config/config.json');
const version = config.version;

const signUp = require('./' + version + '/signup');

router.use('/' + version + '/signup', signUp);

module.exports = router;
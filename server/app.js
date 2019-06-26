const express = require('express');
const app = express();
const config = require('./config/config.json');
const rootRouter = require('./router/index.js');

app.use('/api', rootRouter);

app.listen(config.port, () => {
    console.log('server start');
});
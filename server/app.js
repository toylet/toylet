const express = require('express');
const app = express();
const config = require('./config/config.json');
const rootRouter = require('./router/index.js');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

function connectDB() {
    const databaseUrl = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, {
        useNewUrlParser: true
    });
    const database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', () => {
        
    });
    database.on('disconnected', () => {
        setInterval(connectDB, 5000);
    });
}

app.use('/api', rootRouter);

app.listen(config.port, () => {
    console.log('server start');
    connectDB();
});
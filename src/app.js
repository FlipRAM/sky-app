const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(errorMiddleware);

module.exports = app;
const express = require('express');
const registration = require('../routes/registration');
const app = express();

app.use('/api/registration', registration);

module.exports = app;

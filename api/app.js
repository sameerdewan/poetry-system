const express = require('express');
const app = express();
const registration = require('../routes/registration');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/registration', registration);

module.exports = app;

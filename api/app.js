const express = require('express');
const app = express();
const registration = require('../routes/registration');
const login = require('../routes/login');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/registration', registration);
app.use('/api/login', login);

module.exports = app;

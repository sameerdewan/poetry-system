const express = require('express');
const cors = require('cors');
const app = express();
const registration = require('../routes/registration');
const login = require('../routes/login');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.options('*', cors());

app.use('/api/registration', registration);
app.use('/api/login', login);

module.exports = app;

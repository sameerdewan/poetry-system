const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const User = require('../db/models/User');

router.use(
    OpenApiValidator.middleware({
        apiSpec: './registration.yaml',
        validateResponses: true,
    })
);

router.post('/', async (req, res) => {
    res.end();
});

module.exports = router;

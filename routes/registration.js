const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const User = require('../db/models/User');

const apiSpec = path.join(__dirname, 'registration.yaml');

router.use(
    OpenApiValidator.middleware({
        apiSpec,
        validateResponses: true,
    })
);

router.post('/', async (req, res) => {
    res.end();
});

module.exports = router;

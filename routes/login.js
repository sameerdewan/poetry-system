const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');

const apiSpec = path.join(__dirname, 'login.yaml');

router.use(
    OpenApiValidator.middleware({
        apiSpec,
        validateResponses: true,
    })
);

router.post('/', async (req, res) => {

});

module.exports = router;

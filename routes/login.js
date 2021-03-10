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

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
});

router.post('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

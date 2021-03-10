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
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

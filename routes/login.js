const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const User = require('../db/models/User');
const PoetrySystemJWT = require('../jwt');

const apiSpec = path.join(__dirname, 'login.yaml');
const poetryJWT = new PoetrySystemJWT();

router.use(
    OpenApiValidator.middleware({
        apiSpec,
        validateRequests: true,
    })
);

router.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
});

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).exec();
        if (!user) {
            throw new Error('Username not found');
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch !== true) {
                res.status(400).json({ error: 'Incorrect password' });
            }
            const token = poetryJWT.signPayloadGetToken({ username });
            res.status(200).send({ token });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

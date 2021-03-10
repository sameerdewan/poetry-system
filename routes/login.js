const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const User = require('../db/models/User');

const apiSpec = path.join(__dirname, 'login.yaml');

router.use(
    OpenApiValidator.middleware({
        apiSpec,
        validateRequests: true,
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
                throw new Error('Incorrect password');
            }
            res.status(200).send();
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

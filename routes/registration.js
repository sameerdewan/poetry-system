const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const { nanoid } = require('nanoid');
const User = require('../db/models/User');

const apiSpec = path.join(__dirname, 'registration.yaml');

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
        const { username, password, email } = req.body;
        const validationCode = nanoid();
        const user = new User({ username, password, email, validationCode });
        await user.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/validate/:validationCode', async (req, res) => {
    try {
        const { validationCode } = req.params;
        await User.findOneAndUpdate(
            { validationCode },
            { $set: { validated: true } }
        ).exec();
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

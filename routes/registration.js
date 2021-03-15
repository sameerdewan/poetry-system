const router = require('express').Router();
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const { nanoid } = require('nanoid');
const sendgrid = require('@sendgrid/mail');
const User = require('../db/models/User');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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
        // const message = {
        //     to: email,
        //     from: 'poetrysystems.com',
        //     subject: 'Poetry Verificaiton Code',
        //     text: 'yeay',
        //     html: `<h1>${validationCode}</h1>`
        // };
        // await sendgrid.send(message);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/validate/:validationCode', async (req, res) => {
    try {
        const { validationCode } = req.params;
        const user = await User.findOne({ validationCode }).exec();
        if (!user) {
            throw new Error('Validation code not found');
        }
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

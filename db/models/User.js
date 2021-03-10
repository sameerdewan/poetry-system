const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
        min: [3, 'Username is too short'],
        max: [20, 'Username is too long']
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        min: [5, 'Password is too short']
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true
    },
    validated: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    validationCode: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    credit: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    }
});

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;

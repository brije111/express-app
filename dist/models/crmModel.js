"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;
exports.ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Enter an email'
    },
    password: {
        type: String,
        required: 'Enter a password'
    }
});
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, result) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, result, null, (err, result) => {
            if (err) {
                return next(err);
            }
            user.password = result;
            next();
        });
    });
});
exports.UserSchema.methods.comparePassword = function (str) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(str, user.password, (err, isMatch) => {
            if (err)
                return reject(err);
            if (!isMatch)
                return reject(false);
            resolve(true);
        });
    });
};
//# sourceMappingURL=crmModel.js.map
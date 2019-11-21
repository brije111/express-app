import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
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

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    comparePassword: (str: string) => void;
};

export const UserSchema = new Schema<UserDocument>({
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

UserSchema.pre('save', function (next) {
    const user = this as UserDocument;
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
        })
    })
})

UserSchema.methods.comparePassword = function (str) {
    const user = this as UserDocument;
    return new Promise((resolve, reject) => {
        bcrypt.compare(str, user.password, (err, isMatch) => {
            if (err)
                return reject(err);

            if (!isMatch)
                return reject(false);

            resolve(true);
        })
    })
}
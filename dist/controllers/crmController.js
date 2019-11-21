"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
const jwt = require("jsonwebtoken");
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
class ContactController {
    getContacts(req, res) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    addNewContact(req, res) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContactWithID(req, res) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    updateContact(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteContact(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
}
exports.ContactController = ContactController;
const User = mongoose.model('User', crmModel_1.UserSchema);
class UserController {
    getUsers(req, res) {
        console.log(req.user);
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    addNewUser(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); //process.env.JWT_SECRET
            res.json({ token });
        });
    }
    signInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(422).send({ error: 'Must provide email & password' });
            }
            const user = yield User.findOne({ email });
            if (!user) {
                res.status(422).send({ error: 'Email not found' });
            }
            try {
                yield user.comparePassword(password);
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            catch (err) {
                res.status(422).send({ error: 'Invalid password or email' });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=crmController.js.map
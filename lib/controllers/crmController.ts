import * as mongoose from 'mongoose';
import { ContactSchema, UserSchema } from '../models/crmModel';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RequestWrapper from 'models/RequestWrapper';

const Contact = mongoose.model('Contact', ContactSchema);
export class ContactController {

    public getContacts(req: RequestWrapper, res: Response) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }


    public addNewContact(req: RequestWrapper, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContactWithID(req: RequestWrapper, res: Response) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateContact(req: RequestWrapper, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact(req: RequestWrapper, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }

}

const User = mongoose.model('User', UserSchema);
export class UserController {

    public getUsers(req: RequestWrapper, res: Response) {
        console.log(req.user);
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }


    public addNewUser(req: RequestWrapper, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            res.json({ token });
        });
    }
}
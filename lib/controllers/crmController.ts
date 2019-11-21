import * as mongoose from 'mongoose';
import { ContactSchema, UserSchema, UserDocument } from '../models/crmModel';
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

const User = mongoose.model<UserDocument>('User', UserSchema);
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
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);//process.env.JWT_SECRET
            res.json({ token });
        });
    }

    public async signInUser(req: RequestWrapper, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422).send({ error: 'Must provide email & password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(422).send({ error: 'Email not found' });
        }

        try {
            await user.comparePassword(password);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.send({ token });
        } catch (err) {
            res.status(422).send({ error: 'Invalid password or email' });
        }
    }
}
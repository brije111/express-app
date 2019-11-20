import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { Response } from 'express';
import RequestWrapper from 'models/RequestWrapper';

const User = mongoose.model('User');
export default (req: RequestWrapper, res: Response, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send({ error: 'You must logged in first' });

    jwt.verify(authorization, process.env.JWT_SECRET, async (err, payload: { userId: string }) => {
        if (err)
            return res.status(401).send({ error: 'You must logged in first' });

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
}
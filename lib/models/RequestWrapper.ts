import * as mongoose from 'mongoose';
import { Request } from 'express';
export default interface RequestWrapper extends Request {
    user: mongoose.Document;
}
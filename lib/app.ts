import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import requireAuth from './middleware/requireAuth';

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.MONGODB_URI//'mongodb://localhost/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //adding middleware 
        this.app.use(requireAuth);
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
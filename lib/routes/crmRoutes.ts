import { Application, Request, Response } from "express";
import { ContactController, UserController } from "../controllers/crmController";
import requireAuth from "../middleware/requireAuth";

export class Routes {

    public contactController: ContactController = new ContactController();
    public userController: UserController = new UserController();

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successful!!!!'
                })
            })

        // Contact 
        app.route('/contact')
            // GET endpoint 
            .get(this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);

        // User 
        app.route('/user')
            // GET endpoint 
            .get(requireAuth, this.userController.getUsers)
            // POST endpoint
            .post(this.userController.addNewUser);

        app.route('/signin')
            .post(this.userController.signInUser);
    }
}
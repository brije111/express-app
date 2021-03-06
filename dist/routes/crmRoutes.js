"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
const requireAuth_1 = require("../middleware/requireAuth");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
        this.userController = new crmController_1.UserController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successful!!!!'
            });
        });
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
            .get(requireAuth_1.default, this.userController.getUsers)
            // POST endpoint
            .post(this.userController.addNewUser);
        app.route('/signin')
            .post(this.userController.signInUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map
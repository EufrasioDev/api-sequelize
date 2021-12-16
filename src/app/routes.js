const {Router} = require("express");
//Importando os controllers
const userControllers = require("./controllers/userControllers");
const incidentsController = require("./controllers/incidentsController");
const sessionController = require("./controllers/sessionController");
//Middleware para validar se o usuario esta autenticado
const { isAuthenticated } = require("./Middlewares/AuthMiddleware");
//Importando os metodos de validação dos campos.
const { signUp, signIn } = require("./Middlewares/schema/usersSchema");
const accountController = require("./controllers/accountController");
const routes = new Router();

/**Public User routes */
/**Register Route */
routes.post("/users/register", signUp, userControllers.save);
/**Login Route*/
routes.post("/users/login", signIn, sessionController.create);

/**Account Routes */
routes.get("/users/info/uid=:id", isAuthenticated, userControllers.MyInfo);
routes.patch("/users/offAccount/uid:id", isAuthenticated, userControllers.delete);

/**Incidents Routes */
routes.post("/incidents/save", isAuthenticated, incidentsController.save);
routes.get("/incidents/listAll", isAuthenticated, incidentsController.listAllIncidents);
routes.put("/incidents/update/uid=:incident_id");
routes.patch("/incidents/delete/uid=:incident_id");
//Reaction
routes.post("/incidents/react/uid=:incident_id", isAuthenticated, accountController.reactIncident);

module.exports = routes;

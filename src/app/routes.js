const {Router} = require("express");
const userControllers = require("./controllers/userControllers");
const sessionController = require("./controllers/sessionController");
const AuthMiddleware = require("./Middlewares/AuthMiddleware");

//Importando os metodos de validação dos campos.
const { signUp, signIn } = require("./Middlewares/validator/usersSchema");

const routes = new Router();

/**Public User routes */
routes.get("/users", AuthMiddleware.isAuthenticated, userControllers.index);
routes.delete("/users/delete/:id",  AuthMiddleware.isAuthenticated, userControllers.delete);

/**Login */
routes.post("/login", signIn, sessionController.create);
routes.post("/users/register", signUp, userControllers.save);

module.exports = routes;

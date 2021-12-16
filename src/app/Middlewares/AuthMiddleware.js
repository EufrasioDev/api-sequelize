const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

module.exports = {
  isAuthenticated(req, res, next){
    const auth = req.headers.authorization;

    if (!auth) throw new Error("Usuario não autenticado.");

    const decoded = jwt.verify(auth, config.secret);

    if (!decoded) throw new Error("Usuario não autenticado. | Token expirado");

    req.user_id = decoded.id;
    next();
  },

  isAdmin(req, res, next){
    if(!req.isAdmin) throw new Error("Usuario não autorizado!"); 
    next();
  }
}

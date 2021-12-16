const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");

module.exports = (id, name) => {
  const token = jwt.sign(
    {id: id, name: name}, 
    auth.secret, 
    {
      subject: id,
      expiresIn: auth.expireIn
    }
  );
  return token;
}
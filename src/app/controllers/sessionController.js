const User = require("../models/User");
const {compare} = require("bcrypt");

module.exports = {
  async create(req, res){
    const {form_email, form_password} = req.body;
    const response = await User.findOne({where:{ "email": form_email}});
    if(response === null){
      throw new Error("Email invalido");
    }
    const {id, email, password, name, token} = response;
    if (!await compare(form_password, password)) {
      throw new Error("Email e senha invalidos");
    }
    console.log(name+" Iniciou sessão do banco de dados");
    req.user_id = id;
    return res.json({
      message: name+" logado com sucesso! :)",
      user: {id, email, password, name, token},
    });
  }
}

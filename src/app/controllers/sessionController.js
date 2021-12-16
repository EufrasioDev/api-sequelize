const User = require("../models/User");
const {compare} = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports = {
  async create(req, res){
    const {form_email, form_password} = req.body;
    const response = await User.findOne({where:{ email: form_email }});

    if(!response) throw new Error("Usuario invalido");
    if(response === null) throw new Error("Email invalido");
    const {id, name, password} = response;

    if (!await compare(form_password, password)) {
      throw new Error("Email e senha invalidos");
    }
    
    const token = generateToken(id, name);

    return res.json({
      message: name+" logado com sucesso! :)",
      user: token,
    });
  }
}

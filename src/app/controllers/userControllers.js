const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");

/**
 * Read - findAll
 * Delete - Destroy
 * Create - create
 * Update - const produto = await Produto.findByPk(1);
            //console.log(produto);
            produto.nome = "Mouse Top";
            const resultadoSave = await produto.save();
            console.log(resultadoSave);
 */

module.exports = {
  async index(req, res){
    const response = await Users.findAll();
    console.log("Listando os users do banco de dados...");
    return res.json(response);
  },

  async save(req, res){
    const {name, email, image, password} = req.body;
    const saltRounds = 12;
    const userAlredyExists = await Users.findOne({where:{"email": email}});
    if (userAlredyExists) {
      throw new Error("O email inserido ja foi cadastrado.");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const passHash = await bcrypt.hash(password, salt);
    const token = jwt.sign(
      {name: name, email: email}, 
      auth.secret, 
      {expiresIn: auth.expireIn}
    )
    const response = await Users.create({
      name,
      email,
      image,
      password: passHash,
      token: token
    });
    if(!response){
      throw new Error("Problemas ao cadastrar");
    }
    return res.status(201).json({
      message: "Usuario cadastrado com sucesso"
    });
  },

  async update(req, res){
    const {id} = req.header;
    const response = Users.findByPk(id);
    console.log(user.name+" Atualizado no banco de dados");
    return res.json({message: "Atualizando", content: response});
  },

  async delete(req, res){
    const {id} = req.params;
    const userId = req.user_id;
    if (id !== userId) {
      throw new Error("Operação não autorizada | Usuario tentando deletar outro usuario.");
    }
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("Usuario não encontrado para o id informado");
    }
    console.log(user.name+" Deletado do banco de dados");
    await Users.destroy({where: {id : user.id}})
    return res.json({
      message: "Usuario deletado",
      content: user
    });
  }
}

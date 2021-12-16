const bcrypt = require("bcrypt");
const Users = require("../models/User");

/**
 * Read - findAll -> Retorna um array de objetos com os dados do banco;
 * Read - findOne -> Retorna um objeto com os dados do banco;
 * Delete - Destroy -> Deleta um registro no banco de dados;
 * Create - create -> Insere um registro no banco de dados;
 * Update - save -> Salva o dado que foi alterado no banco de dados.
 * Ex: const produto = await Produto.findByPk(1);
            //console.log(produto);
            produto.nome = "Mouse Top";
            const resultadoSave = await produto.save();
            console.log(resultadoSave);
 */

module.exports = {
  
  async MyInfo(req, res){
    const {id} = req.params;
    const response = await Users.findOne({where: {id, active:true}});
    if(!response) throw new Error("Usuario não encontrado.");
    return res.json(response);
  },

  async save(req, res){
    const {name, email, phone, province, password} = req.body;

    const saltRounds = 12;
    const userAlredyExists = await Users.findOne({where:{email}});
    console.log(userAlredyExists);

    if (userAlredyExists) throw new Error("O email inserido ja foi cadastrado.");

    const salt = await bcrypt.genSalt(saltRounds);
    //Passhash retorna o hash da password do usuario
    const passHash = await bcrypt.hash(password, salt);
    const response = await Users.create({
      name,
      email,
      phone,
      province,
      password: passHash,
    });
    if(!response) throw new Error("Problemas ao cadastrar");
    console.log(response);
    return res.status(201).json({
      message: "Usuario cadastrado com sucesso"
    });
  },

  async update(req, res){
    const {id} = req.header;
    const response = Users.findByPk(id);
    console.log(" Atualizado no banco de dados");
    return res.json({message: "Atualizando", content: response});
  },

  async delete(req, res){
    const {id} = req.params;
    const userId = req.user_id;

    if (id !== userId) throw new Error("Operação não autorizada | Usuario tentando deletar outro usuario.");
    
    const user = await Users.findByPk(id);
    if (!user) throw new Error("Usuario não encontrado para o id informado");
    if(user.active == false) throw new Error("Usuario ja deletado");
    user.active = false;
    await user.save();
    return res.status(200).json({
      message: "Usuario deletado",
      content: user
    });
  }
}

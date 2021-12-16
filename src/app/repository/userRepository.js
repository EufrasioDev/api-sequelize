const connection = require("../database/connection");

module.exports = {
  async findTudo(id){
    const response = await connection.query(`
      SELECT i.type, i.description, u.name FROM incidents as i JOIN users as u on u.id=i.user_id
    `);
    console.log(response);
    return response[0].rows;
  }
}
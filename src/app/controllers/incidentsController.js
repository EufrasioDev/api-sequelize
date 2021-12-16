const Incidents = require("../models/Incidents");

module.exports = {
  async listAllIncidents(req, res) {
    const response = await Incidents.findAll({include: "User"});
    return res.json(response);
  },

  async findIncidentById(req, res) {
    const {id} = req.params;
    const response = await Incidents.findOne({where: id});
    return res.json(response)
  },

  async save(req, res){
    const {type, pet_image, description} = req.body;
    const {incident_id} = req.params;
    const userId = req.user_id;

    const response = await Incidents.create({
      type,
      pet_image,
      description,
      incident_id,
      user_id: userId
    });

    return res.json(response);
  }
}
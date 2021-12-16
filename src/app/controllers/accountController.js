const Incidents = require("../models/Incidents");
const Reactions = require("../models/Reactions");
const User = require("../models/User");

module.exports = {
  async incidentsAtMyHood(req, res){
    const userId = req.user_id
    const {province} = await User.findOne({where: {id: userId}})
    const response = await User.findAll({where: {province}});
    return res.status(200).json(response);
  },

  async listMyIncidents(req, res){
    const userId = req.userId;
    const response = await Incidents.findAll({where: {user_id: userId}});
    return res.status(200).json(response);
  },

  async reactIncident(req, res){
    const {incident_id} = req.params;
    const reactionType = req.query.type
    const {user_id} = req;
    // const incident = Incidents.findByPk(incident_id);
    await Reactions.create({
      type: reactionType,
      incident_id,
      user_id
    })
    return res.json({
      message: "Usuario reagiu com sucesso."
    });
  }
}
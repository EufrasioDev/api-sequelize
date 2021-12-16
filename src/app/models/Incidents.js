'use strict';

const {DataTypes} = require("sequelize");
const connection = require("../database/connection");
const Reactions = require("./Reactions");
const Users = require("./User");

const Incidents = connection.define("incidents", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pet_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
});

Incidents.belongsTo(Users, {
  constraint: true,
  foreignKey: "user_id"
});

Incidents.belongsToMany(Users, {
  through: {
    model: Reactions
  },
  constraint: true,
  foreignKey: "incident_id"
});

module.exports = Incidents;

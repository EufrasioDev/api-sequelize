'use strict';

const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Reactions = connection.define("reactions", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id:{
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

module.exports = Reactions;

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('incidents', 
    { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false 
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pet_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
   return await queryInterface.dropTable('incidents');
  }
};

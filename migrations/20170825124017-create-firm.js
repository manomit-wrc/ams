'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('firms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      registration_no: {
        type: Sequelize.STRING
      },
      contact_person_name: {
        type: Sequelize.STRING
      },
      contact_person_role: {
        type: Sequelize.STRING
      },
      level_1_designation: {
        type: Sequelize.INTEGER
      },
      level_2_designation: {
        type: Sequelize.INTEGER
      },
      level_3_designation: {
        type: Sequelize.INTEGER
      },
      level_4_designation: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('firms');
  }
};
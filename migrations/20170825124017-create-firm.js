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
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registration_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_person_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contact_person_role: {
        type: Sequelize.STRING,
        allowNull: false
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
      section:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      practice_area:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      jurisdiction:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status:{
        allowNull: false,
        type: Sequelize.INTEGER(1)
      },
      approval_process: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      menu_active: {
        allowNull: false,
        type: Sequelize.INTEGER(1),
        defaultValue: 1
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('firms');
  }
};

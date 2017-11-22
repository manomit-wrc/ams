'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('attorneys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      section_id: {
        type: Sequelize.STRING
      },
      attorneyID: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      attorney_type_id: {
        type: Sequelize.INTEGER
      },
      education: {
        type: Sequelize.STRING
      },
      bar_reg: {
        type: Sequelize.STRING
      },
      job_type_id: {
        type: Sequelize.INTEGER
      },
      practice_date: {
        type: Sequelize.STRING
      },
      firm_join_date: {
        type: Sequelize.STRING
      },
      jurisdiction_id: {
        type: Sequelize.STRING
      },
      industry_type_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('attorneys');
  }
};
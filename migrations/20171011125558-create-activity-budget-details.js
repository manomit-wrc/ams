'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('activitybudgetdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_id: {
        type: Sequelize.INTEGER
      },
      budget_code_type: {
        type: Sequelize.STRING
      },
      budget_code: {
        type: Sequelize.STRING
      },
      budget_code_hours: {
        type: Sequelize.STRING
      },
      budget_code_cost: {
        type: Sequelize.STRING
      },
      original_budget_code_hours: {
        type: Sequelize.STRING
      },
      original_budget_code_cost: {
        type: Sequelize.STRING
      },
      budget_dtl_status: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('activitybudgetdetails');
  }
};
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firm_id: {
        type: Sequelize.INTEGER
      },
      attorney_id: {
        type: Sequelize.INTEGER
      },
      activity_type_id: {
        type: Sequelize.INTEGER
      },
      activity_goal: {
        type: Sequelize.STRING
      },
      practice_area_type: {
        type: Sequelize.STRING
      },
      potential_revenue: {
        type: Sequelize.STRING
      },
      attorney_name: {
        type: Sequelize.STRING
      },
      activity_name: {
        type: Sequelize.STRING
      },
      activity_reason: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.DATEONLY
      },
      from_duration: {
        type: Sequelize.DATEONLY
      },
      to_duration: {
        type: Sequelize.DATEONLY
      },
      activity_details_id: {
        type: Sequelize.INTEGER
      },
      budget_details_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('activities');
  }
};
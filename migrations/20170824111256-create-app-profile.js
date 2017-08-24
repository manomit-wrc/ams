'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('AppProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      base_location: {
        type: Sequelize.STRING
      },
      current_location: {
        type: Sequelize.STRING
      },
      base_session_ref: {
        type: Sequelize.TEXT
      },
      current_session_ref: {
        type: Sequelize.TEXT
      },
      last_device_type: {
        type: Sequelize.STRING
      },
      last_ip_address: {
        type: Sequelize.STRING
      },
      last_device_ref: {
        type: Sequelize.TEXT
      },
      last_accessed_time: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: '1'
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
    return queryInterface.dropTable('AppProfiles');
  }
};
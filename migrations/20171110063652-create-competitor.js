'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('competitors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      competitor_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      industry_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bar_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      independent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chambers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      best: {
        type: Sequelize.STRING,
        allowNull: false
      },
      super_lawyers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_line_1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_line_2: {
        type: Sequelize.STRING
      },
      address_line_3: {
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      postal_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fax: {
        type: Sequelize.STRING
      },
      mobile: {
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
    return queryInterface.dropTable('competitors');
  }
};
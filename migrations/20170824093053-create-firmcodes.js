'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('firmcodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      code_master_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      },
      firm_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      },
      short_description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      long_description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING(10)
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
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
    return queryInterface.dropTable('firmcodes');
  }
};

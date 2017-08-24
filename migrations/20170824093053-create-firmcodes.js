'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Firmcodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      code_master_id: {
        type: Sequelize.INTEGER(10)
      },
      firm_id: {
        type: Sequelize.INTEGER(10)
      },
      short_description: {
        type: Sequelize.STRING(50)
      },
      long_description: {
        type: Sequelize.STRING(255)
      },
      remarks: {
        type: Sequelize.STRING(255)
      },
      created_by: {
        type: Sequelize.STRING(10)
      },
      status: {
        type: Sequelize.STRING(1)
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
    return queryInterface.dropTable('Firmcodes');
  }
};

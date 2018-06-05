'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('budgetcodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      budget_code_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      code:{
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      budget_code: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      remarks: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.INTEGER(1)
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
    return queryInterface.dropTable('budgetcodes');
  }
};

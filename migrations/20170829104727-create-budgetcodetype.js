'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('budgetcodetypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      budget_code_type: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      remarks: {
        type: Sequelize.STRING (255)
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
    return queryInterface.dropTable('budgetcodetypes');
  }
};

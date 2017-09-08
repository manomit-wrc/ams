'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('firmgroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      group_id: {
        type: Sequelize.INTEGER(10),
          allowNull: false,
      },
      firm_id: {
        type: Sequelize.INTEGER(10),
          allowNull: false,
      },
      group_code: {
        type: Sequelize.STRING(50),
          allowNull: false,
      },
      group_name: {
        type: Sequelize.STRING(50),
          allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('firmgroups');
  }
};

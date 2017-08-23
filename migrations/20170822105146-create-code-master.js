'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('CodeMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      categoryid: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      shortdescription: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      longdescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING(50)
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
    return queryInterface.dropTable('CodeMasters');
  }
};

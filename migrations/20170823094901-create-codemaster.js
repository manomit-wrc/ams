'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('codemasters', {
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
      code: {
      allowNull: false,
        type: Sequelize.STRING(50)
      },
      shortdescription: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      longdescription: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      remarks: {
        allowNull: false,
        type: Sequelize.STRING(255)
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
      },
      status: {
        type: Sequelize.STRING(25)
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('codemasters');
  }
};

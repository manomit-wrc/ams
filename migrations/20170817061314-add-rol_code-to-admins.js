'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'admins',
        'rol_code',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('admins', 'rol_code')
    ];
  }
};

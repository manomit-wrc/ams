'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
          queryInterface.addColumn(
            'codemasters',
            'code',
            {
              type: Sequelize.STRING(50),
              allowNull: false
            }
          )
        ];

  },

  down: function (queryInterface, Sequelize) {
    return [
          queryInterface.removeColumn('codemasters', 'code')
        ];
  }
};

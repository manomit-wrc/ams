'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'attorneys',
           'firm_id',
           {
             type: Sequelize.STRING,
             after: 'id'

           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('attorneys', 'firm_id')
    ];
  }
};

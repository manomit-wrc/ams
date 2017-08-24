'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'codecategories',
           'status',
           {
             type: Sequelize.STRING(25),
             defaultValue: '1'
           }
         )
       ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('codecategories', 'status')
       ];
  }
};

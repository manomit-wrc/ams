'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'codemasters',
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
         queryInterface.removeColumn('codemasters', 'status')
       ];
  }
};

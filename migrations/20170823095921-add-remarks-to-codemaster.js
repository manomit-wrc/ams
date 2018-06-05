'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'codemasters',
           'remarks',
           {
             type: Sequelize.STRING(255),
             allowNull: false
           }
         )
       ];

  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('codemasters', 'remarks')
       ];
  }
};

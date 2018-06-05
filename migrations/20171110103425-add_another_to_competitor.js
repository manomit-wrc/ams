'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'competitors',
           'bar_belongs_to_state',
           {
             type: Sequelize.STRING,
             after: 'bar_date'

           }
         ),
         queryInterface.addColumn(
           'competitors',
           'martindale',
           {
             type: Sequelize.STRING,
             after: 'best'

           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('competitors', 'bar_belongs_to_state'),
         queryInterface.removeColumn('competitors', 'martindale'),
    ];
  }
};

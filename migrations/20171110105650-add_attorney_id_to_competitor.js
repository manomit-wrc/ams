'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return [
         queryInterface.addColumn(
           'competitors',
           'attorney_id',
           {
             type: Sequelize.INTEGER,
             after: 'id'

           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('competitors', 'attorney_id')
    ];
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'mastercontacts',
           'referrel_id',
           {
             type: Sequelize.INTEGER,
             after: 'attorney_id'

           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('mastercontacts', 'referrel_id')
    ];
  }
};

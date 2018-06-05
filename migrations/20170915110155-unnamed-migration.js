'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'mastercontacts',
           'tag_id',
           {
             type: Sequelize.STRING,
             after: 'record_type'

           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('mastercontacts', 'tag_id')
    ];
  }
};

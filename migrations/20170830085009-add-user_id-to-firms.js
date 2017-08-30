'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'firms',
           'user_id',
           {
             type: Sequelize.INTEGER(20),
             allowNull: true,
             after: 'id'
           }
         )
       ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('firms', 'user_id')
       ];
  }
};

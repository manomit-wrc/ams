'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'attorneys',
           'practice_area',
           {
             type: Sequelize.INTEGER(20),
             allowNull: true,
             after: 'industry_type_id'
           }
         )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('attorneys', 'practice_area')
    ];
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'sections',
           'status',
           {
             type: Sequelize.STRING(1),

           }
         )
       ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('sections', 'status')
       ];
  }
};

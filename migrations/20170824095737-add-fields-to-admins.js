'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'admins',
           'group_id',
           {
             type: Sequelize.INTEGER(1),
             allowNull: false,
             after: 'role_code'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'remarks',
           {
             type: Sequelize.TEXT,
             allowNull: false,
             after: 'role_code'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'reg_type',
           {
             type: Sequelize.STRING(1),
             allowNull: false,
             after: 'role_code'
           }
         )
       ];
  },

  down: function (queryInterface, Sequelize) {
    return [
         queryInterface.removeColumn('admins', 'group_id'),
         queryInterface.removeColumn('admins', 'reamrks'),
         queryInterface.removeColumn('admins', 'reg_type')
    ];
  }
};

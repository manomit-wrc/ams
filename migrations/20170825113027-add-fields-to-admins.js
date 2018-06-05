'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
         queryInterface.addColumn(
           'admins',
           'gender',
           {
             type: Sequelize.STRING(20),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'designation_id',
           {
             type: Sequelize.INTEGER,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'is_attorney',
           {
             type: Sequelize.INTEGER(1),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'fax',
           {
             type: Sequelize.STRING(100),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'mobile',
           {
             type: Sequelize.STRING(100),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'website',
           {
             type: Sequelize.STRING(255),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'social',
           {
             type: Sequelize.STRING(255),
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'address_2',
           {
             type: Sequelize.TEXT,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'address_3',
           {
             type: Sequelize.TEXT,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'country_id',
           {
             type: Sequelize.INTEGER,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'state_id',
           {
             type: Sequelize.INTEGER,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'city_id',
           {
             type: Sequelize.INTEGER,
             allowNull: true,
             after: 'group_id'
           }
         ),
         queryInterface.addColumn(
           'admins',
           'zipcode',
           {
             type: Sequelize.STRING,
             allowNull: true,
             after: 'group_id'
           }
         )
       ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

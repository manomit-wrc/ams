'use strict';
module.exports = function(sequelize, DataTypes) {
  var Firm = sequelize.define('firm', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    registration_no: DataTypes.STRING,
    contact_person_name: DataTypes.STRING,
    contact_person_role: DataTypes.STRING,
    level_1_designation: DataTypes.INTEGER,
    level_2_designation: DataTypes.INTEGER,
    level_3_designation: DataTypes.INTEGER,
    level_4_designation: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Firm;
};
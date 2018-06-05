'use strict';
module.exports = function(sequelize, DataTypes) {
  var FirmPractice = sequelize.define('firmpractice', {
    firm_id: DataTypes.INTEGER,
    practice_area_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FirmPractice;
};
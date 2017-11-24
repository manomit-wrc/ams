'use strict';
module.exports = function(sequelize, DataTypes) {
  var FirmSection = sequelize.define('firmsection', {
    firm_id: DataTypes.INTEGER,
    section_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FirmSection;
};
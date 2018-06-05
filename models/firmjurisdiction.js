'use strict';
module.exports = function(sequelize, DataTypes) {
  var FirmJurisdiction = sequelize.define('firmjurisdiction', {
    firm_id: DataTypes.INTEGER,
    codemaster_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FirmJurisdiction;
};
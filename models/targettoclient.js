'use strict';
module.exports = function(sequelize, DataTypes) {
  var TargetToClient = sequelize.define('targettoclient', {
    mastercontact_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TargetToClient;
};
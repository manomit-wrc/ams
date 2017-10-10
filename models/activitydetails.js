'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivityDetails = sequelize.define('activitydetails', {
    code: DataTypes.STRING,
    short_description: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ActivityDetails;
};
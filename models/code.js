'use strict';
module.exports = function(sequelize, DataTypes) {
  var Code = sequelize.define('code', {
    category_type: DataTypes.STRING,
    code: DataTypes.STRING,
    short_description: DataTypes.STRING,
    long_description: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Code;
};
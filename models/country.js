'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('country', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Country;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('city', {
    name: DataTypes.STRING,
    state_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return City;
};
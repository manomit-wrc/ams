'use strict';
module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define('state', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    country_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return State;
};
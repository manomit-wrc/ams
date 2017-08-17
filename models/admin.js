'use strict';
module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone_no: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avator: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Admin;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var ZipCode = sequelize.define('zipCode', {
    zip: DataTypes.STRING,
    city_name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ZipCode;
};
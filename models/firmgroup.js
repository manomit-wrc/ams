'use strict';
module.exports = function(sequelize, DataTypes) {
  var Firmgroup = sequelize.define('Firmgroup', {
    group_id: DataTypes.INTEGER,
    firm_id: DataTypes.INTEGER,
    group_code: DataTypes.STRING,
    group: DataTypes.STRING,
    created_by: DataTypes.STRING,
    remarks: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Firmgroup;
};
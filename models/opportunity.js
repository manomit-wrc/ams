'use strict';
module.exports = function(sequelize, DataTypes) {
  var Opportunity = sequelize.define('opportunity', {
    user_id: DataTypes.INTEGER,
    firm_id: DataTypes.INTEGER,
    attorney_id: DataTypes.INTEGER,
    referrel_id: DataTypes.INTEGER,
    referrel_type: DataTypes.STRING,
    opportunity_name: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Opportunity;
};
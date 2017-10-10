'use strict';
module.exports = function(sequelize, DataTypes) {
  var BudgetDetails = sequelize.define('budgetdetails', {
    budget_code: DataTypes.STRING,
    short_description: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BudgetDetails;
};
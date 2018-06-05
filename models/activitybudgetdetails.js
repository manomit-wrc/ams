'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivityBudgetDetails = sequelize.define('activitybudgetdetails', {
    activity_id: DataTypes.INTEGER,
    budget_code_type: DataTypes.STRING,
    budget_code: DataTypes.STRING,
    budget_code_hours: DataTypes.STRING,
    budget_code_cost: DataTypes.STRING,
    original_budget_code_hours: DataTypes.STRING,
    original_budget_code_cost: DataTypes.STRING,
    budget_dtl_status: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ActivityBudgetDetails;
};
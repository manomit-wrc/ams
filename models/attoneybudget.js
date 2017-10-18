'use strict';
module.exports = function(sequelize, DataTypes) {
  var AttoneyBudget = sequelize.define('attoneybudget', {
    attorney_id:{ type: DataTypes.INTEGER,
    allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Attorney id cannot be null'
        },
      }
    },
    activity_id:{type: DataTypes.INTEGER,
    allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity id cannot be null'
        },
      }
    },
    contact_id: DataTypes.INTEGER,
    relation_type: DataTypes.STRING,
    budget_cost: DataTypes.STRING,
    potential_revenue: DataTypes.STRING,
    activity_details: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AttoneyBudget;
};
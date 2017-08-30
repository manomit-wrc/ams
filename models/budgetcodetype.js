'use strict';
module.exports = function(sequelize, DataTypes) {
  var budgetcodetype = sequelize.define('budgetcodetype', {
    code:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    budget_code_type:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'Please enter budget code type'
        },
      }
    },
    remarks:{
      type:DataTypes.STRING,
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:1
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return budgetcodetype;
};

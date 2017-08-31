'use strict';
module.exports = function(sequelize, DataTypes) {
  var budgetcode = sequelize.define('budgetcode', {
    budget_code_type_id: {
    type: DataTypes.INTEGER,
      allowNull: false,
  },
  code:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:
    { notEmpty:
      {
        args: true,
        msg: 'Please enter code'
      },
    }

  },
    budget_code: {
    type: DataTypes.STRING,
    allowNull:false,
    validate:
    { notEmpty:
      {
        args: true,
        msg: 'Please enter budget code'
      },
    }

  },
    remarks: {
    type: DataTypes.STRING,
  },
    status: {
    type: DataTypes.INTEGER,
    defaultValue:1
  }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return budgetcode;
};

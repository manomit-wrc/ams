'use strict';
module.exports = function(sequelize, DataTypes) {
  var AttorneyType = sequelize.define('attorneytype', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    attorney: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter attorney'
        },
      }
    },
    remark: {
      type: DataTypes.STRING,
      validate: 
      { 
        notEmpty: 
        {
          args: true,
          msg: 'Please enter remarks'
        },
      }
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: '1'
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AttorneyType;
};
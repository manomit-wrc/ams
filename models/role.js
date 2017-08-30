'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('role', {
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter role'
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
  return Role;
};
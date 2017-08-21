'use strict';
module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'First Name can not be blank'
        },
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Last Name can not be blank'
        },
      }
    },
    address: {
      type: DataTypes.TEXT,
      validate: 
      { 
        notEmpty: 
        {
          args: true,
          msg: 'Address can not be blank'
        },
      }
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Phone no can not be blank'
        },
        isNumeric: {
          atgs: true,
          msg: 'Phone number must be numeric'
        },
        len: {
          args: [10,10],
          msg: 'Phone no must have 10 digits'
        }
      }
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: 
      { 
        notEmpty: 
        {
          args: true,
          msg: 'Password can not be blank'
        },
      }
    },
    avator: DataTypes.STRING,
    role_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Admin;
};
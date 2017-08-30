'use strict';
module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('admin', {
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
    email: {
      type: DataTypes.STRING,
      unique: { name: 'email', msg: 'Email is already registered.' },
    },
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
    role_code: DataTypes.STRING,
    reg_type: DataTypes.STRING(1),
    remarks: DataTypes.TEXT,
    group: DataTypes.STRING(50),
    gender: DataTypes.STRING(20),
    designation_id: DataTypes.INTEGER,
    is_attorney: DataTypes.INTEGER(1),
    fax: DataTypes.STRING(100),
    mobile: DataTypes.STRING(100),
    website: DataTypes.STRING(255),
    social: DataTypes.STRING(255),
    address_2: DataTypes.TEXT,
    address_3: DataTypes.TEXT,
    country_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    zipcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Admin;
};
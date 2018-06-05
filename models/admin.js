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
      type: DataTypes.TEXT
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false
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

    group_id: DataTypes.INTEGER(11),

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
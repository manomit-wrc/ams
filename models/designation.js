'use strict';
module.exports = function(sequelize, DataTypes) {
  var Designation = sequelize.define('designation', {

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
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter designation'
        },
      }
    },
    remarks: {
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
    scopes: {
    status: {
      where: {
        status: 1
      }
    }
  },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Designation;
};
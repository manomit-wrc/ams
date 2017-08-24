'use strict';
module.exports = function(sequelize, DataTypes) {
  var Designation = sequelize.define('Designation', {

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
        DefaultValue: '1'
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Designation;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define('Section', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter name'
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter description'
        },
      }
    },
    remarks: {
      type: DataTypes.TEXT,
      validate: 
      { 
        notEmpty: 
        {
          args: true,
          msg: 'Please enter remarks'
        },
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Section;
};
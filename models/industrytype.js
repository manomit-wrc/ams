'use strict';
module.exports = function(sequelize, DataTypes) {
  var IndustryType = sequelize.define('industrytype', {
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
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter industry'
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
  return IndustryType;
};
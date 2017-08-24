'use strict';
module.exports = function(sequelize, DataTypes) {
  var Codecategory = sequelize.define('Codecategory', {
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'Please enter category name'
        },

      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '1'
    },

  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Codecategory;
};

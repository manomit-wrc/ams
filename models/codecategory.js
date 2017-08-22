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
          msg: 'Please enter name'
        },

      }
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Codecategory;
};

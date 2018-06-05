'use strict';
module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define('section', {
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
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '1'

    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Section;
};

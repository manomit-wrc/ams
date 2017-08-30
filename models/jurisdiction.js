'use strict';
module.exports = function(sequelize, DataTypes) {
  var Jurisdiction = sequelize.define('jurisdiction', {
    jurisdiction_code:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
            args: true,
            msg: 'Please enter jurisdiction code'
          },
        }
    },
    jurisdiction:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
            args: true,
            msg: 'Please enter jurisdiction'
          },
        }
      },
    remarks:{
      type:DataTypes.STRING
    },
    status:{
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Jurisdiction;
};

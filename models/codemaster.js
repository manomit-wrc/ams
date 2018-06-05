'use strict';
module.exports = function(sequelize, DataTypes) {
  var Codemaster = sequelize.define('codemaster', {
    categoryid:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'Please select a category'
        },
      }
    },

    code:{
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

    shortdescription:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'Please enter short description'
        },
      }
    },

    longdescription:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
          args: true,
          msg: 'First enter long description'
        },
      }
    },
    remarks:{
          type: DataTypes.STRING,
          allowNull: false,
        },

    createdby:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      defaultValue:'1'

    },

  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Codemaster;
};

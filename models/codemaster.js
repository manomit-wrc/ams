'use strict';
module.exports = function(sequelize, DataTypes) {
  var CodeMaster = sequelize.define('CodeMaster', {
    categoryid: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
         notEmpty:{
           args: true,
           msg: 'Please select a code category'
         },
      }

    },
    code:{
      type:  DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:' Please select code'
        },
      }
    },
    shortdescription: {
      type:  DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:' Please enter Short description'
        },
      }
    },

    longdescription:{
      type:  DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:' Please enter Long description'
        },
      }
    },

    remarks: DataTypes.STRING,
    createdby: DataTypes.STRING,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        CodeMaster.belongsTo(models.Codecategory, {foreignKey:'categoryid'})
      }
    }
  });
  return CodeMaster;
};

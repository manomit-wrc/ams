'use strict';
module.exports = function(sequelize, DataTypes) {
  var Firmcodes = sequelize.define('Firmcodes', {

    code_master_id:
    {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    firm_id:
    {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    short_description:
    {
      type: DataTypes.STRING,
      allowNull:false
    },
    long_description:
    {
      type:  DataTypes.STRING,
      allowNull:false
    },
    remarks:
    {
      type:  DataTypes.STRING,
    },
    created_by:
    {
      type:  DataTypes.STRING,
      allowNull:false
    },
    status:
    {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Firmcodes;
};

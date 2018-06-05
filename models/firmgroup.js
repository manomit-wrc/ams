'use strict';
module.exports = function(sequelize, DataTypes) {
  var FirmGroup = sequelize.define('firmgroup', {
    group_id:
    {
      type:DataTypes.INTEGER,
      allowNull:false

    },
    firm_id:
    {
      type: DataTypes.INTEGER,
      allowNull:false

    },
    group_code:
    {
      type:DataTypes.STRING,
      allowNull:false

    },
    group_name:
    {
      type:DataTypes.STRING,
      allowNull:false

    },
    created_by:
    {
      type:DataTypes.STRING,
      allowNull:false

    },
    remarks:
    {
      type:DataTypes.STRING,
      allowNull:false

    },
    status:
    {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: '1'
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FirmGroup;
};

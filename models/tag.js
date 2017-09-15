'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    mastercontact_id: DataTypes.INTEGER,
    firm_id: DataTypes.INTEGER,
    tag_name: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tag;
};
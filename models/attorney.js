'use strict';
module.exports = function(sequelize, DataTypes) {
  var Attorney = sequelize.define('attorney', {
    user_id:{
            type: DataTypes.INTEGER,
            //allowNull: false,
    },
    username: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    section_id: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    attorneyID: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    code: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    attorney_type_id: {
        type: DataTypes.INTEGER,
        //allowNull: false,
    },
    education: {
          type: DataTypes.STRING,
         // allowNull: false,
    },
    bar_reg: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    job_type_id: {
          type: DataTypes.INTEGER,
          //allowNull: false,
    },
    practice_date: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    firm_join_date: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    jurisdiction_id: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    industry_type_id: {
          type: DataTypes.INTEGER,
          //allowNull: false,
    },
    practice_area: {
          type: DataTypes.STRING,
          //allowNull: false,
    },
    firm_id:{
            type: DataTypes.INTEGER,
            //allowNull: false,
    },
    status: {
          type:DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Attorney;
};
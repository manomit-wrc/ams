'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('activity', {
    firm_id:{ type:DataTypes.INTEGER,
      
    },
    attorney_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Attorney id cannot be null'
        },
      }
    },
    activity_type_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity type cannot be null'
        },
      }
    },
    activity_goal:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity goal cannot be null'
        },
      }
    },
    practice_area_type:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Practice area cannot be null'
        },
      }
    },
    potential_revenue:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Potential revenue cannot be null'
        },
      }
    },
    attorney_name:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Attorney name cannot be null'
        },
      }
    },
    activity_name:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity name cannot be null'
        },
      }
    },
    activity_reason:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity reason cannot be null'
        },
      }
    },
    creation_date:{ type:DataTypes.DATEONLY,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Creation date cannot be null'
        },
      }
    },
    from_duration:{ type:DataTypes.DATEONLY,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'From duration cannot be null'
        },
      }
    },
    to_duration:{ type:DataTypes.DATEONLY,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'To duration cannot be null'
        },
      }
    },
    activity_details_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Activity details cannot be null'
        },
      }
    },
    budget_details_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Budget status cannot be null'
        },
      }
    },
    remarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Activity;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var AttorneyGoal = sequelize.define('attorneygoal', {
    attorney_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    firm_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    current_year:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    current_year_goal:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    goal_percentage:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
        },
      }
    },
    summary:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter code'
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
  return AttorneyGoal;
};
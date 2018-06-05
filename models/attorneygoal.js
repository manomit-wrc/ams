'use strict';
module.exports = function(sequelize, DataTypes) {
  var AttorneyGoal = sequelize.define('attorneygoal', {
    attorney_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select attorney'
        },
      }
    },
    firm_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Firm id cannot be null'
        },
      }
    },
    current_year:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter current year'
        },
      }
    },
    current_year_goal:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter current year goal'
        },
      }
    },
    goal_percentage:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter goal percentage'
        },
      }
    },
    summary:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter summary'
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
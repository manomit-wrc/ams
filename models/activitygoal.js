'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activitygoal = sequelize.define('activitygoal', {
    attorney_seq_no:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select attorney'
        },
      }
    },
    firm_seq_no:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Firm id cannot be null'
        },
      }
    },
    activity_goal:{ type:DataTypes.STRING,
    },
    remarks:{ type:DataTypes.STRING,
    },
    from_date:{ type:DataTypes.DATEONLY,
    },
    to_date:{ type:DataTypes.DATEONLY,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Activitygoal;
};
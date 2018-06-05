'use strict';
module.exports = function(sequelize, DataTypes) {
  var Firm = sequelize.define('firm', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'User id cannot be null'
          }

        },
    },

    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'Please enter Firm name'
          }

        },
    },

    code:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'Please enter Firm Code'
          }

        },
    },

    registration_no:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'Please enter Firm Registration Name'
          }

        },
    },

    contact_person_name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'Please enter Single Contact Person'
          }

        },
    },

    contact_person_role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        { notEmpty:
          {
              args: true,
              msg: 'Please enter Contact person role'
          }

        },
    },

    level_1_designation:{
        type: DataTypes.INTEGER
    },

    level_2_designation:{
        type: DataTypes.INTEGER
    },

    level_3_designation:{
        type:DataTypes.INTEGER
    },

    level_4_designation:{
        type:DataTypes.INTEGER
    },
    section:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Please select sections'
        }

      },
    },
    practice_area:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Please select practice areas'
        }

      },
    },
    jurisdiction:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Please select jurisdictions'
        }

      },
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    approval_process:{
      type:DataTypes.INTEGER
    },
    menu_active:{
      type:DataTypes.INTEGER,
      defaultValue:1
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Firm;
};

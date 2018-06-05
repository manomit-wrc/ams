'use strict';
module.exports = function(sequelize, DataTypes) {
  var Competitor = sequelize.define('competitor', {
    attorney_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
          validate: 
          { notEmpty: 
            {
              args: true,
              msg: 'Attorney id cannot be null'
            },
      }
    },
    competitor_id: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'competitor id cannot be null'
        },
      }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'code cannot be null'
        },
      }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'last name cannot be null'
        },
      }
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'dob cannot be null'
        },
      }
    },
    industry_type: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'industry type cannot be null'
        },
      }
    },
    bar_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'bar date cannot be null'
        },
      }
    },
    bar_belongs_to_state: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'bar belongs to state cannot be null'
        },
      }
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'experience cannot be null'
        },
      }
    },
    independent: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'independent cannot be null'
        },
      }
    },
    chambers: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'chambers cannot be null'
        },
      }
    },
    best: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'best cannot be null'
        },
      }
    },
    martindale: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'martindale cannot be null'
        },
      }
    },
    super_lawyers: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'super lawyer cannot be null'
        },
      }
    },
    address_line_1: {
        type: DataTypes.STRING
    },
    address_line_2: {
        type: DataTypes.STRING
    },
    address_line_3: {
        type: DataTypes.STRING
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'country id cannot be null'
        },
      }
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'state id cannot be null'
        },
      }
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'city id cannot be null'
        },
      }
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'postal code cannot be null'
        },
      }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'email cannot be null'
        },
      }
    },
    phone: {
        type: DataTypes.STRING
    },
    fax: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    remarks: {
        type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Competitor;
};
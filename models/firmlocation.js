'use strict';
module.exports = function(sequelize, DataTypes) {
  var Firmlocation = sequelize.define('firmlocation', {
    firm_id: { type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Firm cannot be null'
        },
      }
    },
    firm_address_type:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter firm address type'
        },
      }
    },
    email:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter email'
        },
      }
    },
    phone:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter phone'
        },
      }
    },
    fax:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter fax'
        },
      }
    },
    mobile:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter mobile'
        },
      }
    },
    website_url:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter website url'
        },
      }
    },
    social_url:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please enter social url'
        },
      }
    },
    address_line1:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select address line 1'
        },
      }
    },
    address_line2:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select address line2'
        },
      }
    },
    address_line3:{ type:DataTypes.STRING,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select address line3'
        },
      }
    },
    country_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select country'
        },
      }
    },
    state_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select state'
        },
      }
    },
    city_id:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select city'
        },
      }
    },
    postal_code:{ type:DataTypes.INTEGER,
      allowNull: false,
      validate: 
      { notEmpty: 
        {
          args: true,
          msg: 'Please select postal code'
        },
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Firmlocation;
};
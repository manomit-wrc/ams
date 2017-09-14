'use strict';
module.exports = function(sequelize, DataTypes) {
  var mastercontact = sequelize.define('mastercontact', {
    add_flag:{
      type:  DataTypes.INTEGER,
    },
    firm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Firm id cannot be null'
        }

      },
    },
    attorney_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Attorney id cannot be null'
        }

      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Code cannot be null'
        }

      },
    },
    designation:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Designation cannot be null'
        }

      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'First name cannot be null'
        }

      },
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Last name cannot be null'
        }

      },
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Type cannot be null'
        }

      },
    },
    dob:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Date of birth cannot be null'
        }

      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'gendercannot be null'
        }

      },
    },
    social_security_no:{
      type: DataTypes.INTEGER,

    },
    address_line_1:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Address cannot be null'
        }

      },
    },
    address_line_2:{
      type: DataTypes.STRING,
    },
    address_line_3:{
      type: DataTypes.STRING,
    },
    country:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Country cannot be null'
        }

      },
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'City cannot be null'
        }

      },
    },
    state:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'State cannot be null'
        }

      },
    },
    postal_code:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Postal code cannot be null'
        }

      },
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Email cannot be null'
        }

      },
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      { notEmpty:
        {
            args: true,
            msg: 'Phone cannot be null'
        }

      },
    },
    fax:{
      type: DataTypes.STRING
    },
    mobile_cell:{
      type: DataTypes.STRING
    },
    website_url:{
      type: DataTypes.STRING
    },
    social_media_url:{
      type: DataTypes.STRING
    },
    twitter:{
      type:DataTypes.STRING
    },
    linkedin:{
      type: DataTypes.STRING
    },
    youtube:{
      type: DataTypes.STRING
    },
    google:{
      type: DataTypes.STRING
    },
    im: {
      type: DataTypes.STRING
    },
    association_status: {
      type: DataTypes.STRING
    },
    industry_type:{
      type: DataTypes.INTEGER
    },
    remarks_notes:{
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mastercontact;
};

'use strict';
module.exports = function(sequelize, DataTypes) {
  var mastercontact = sequelize.define('mastercontact', {
    add_flag:{
      type:  DataTypes.INTEGER,
    },
    firm_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attorney_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    referrel_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    designation_id:{
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
    type:{
      type: DataTypes.STRING,
      allowNull: true
    },
    dob:{
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    social_security_no:{
      type: DataTypes.INTEGER,

    },

    company_name:{
      type: DataTypes.TEXT,
      allowNull: true

    },
    address_line_1:{
      type: DataTypes.STRING,
      allowNull: true
    },
    address_line_2:{
      type: DataTypes.STRING,
    },
    address_line_3:{
      type: DataTypes.STRING,
    },
    country_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    city_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    postal_code:{
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: true
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
    },
    remarks_notes:{
      type: DataTypes.STRING
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    record_type:{
      allowNull: true,
      type: DataTypes.ENUM('M', 'R', 'C', 'T'),
    },
    tag_id:{
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

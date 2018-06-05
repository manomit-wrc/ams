'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('mastercontacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      add_flag: {
        type: Sequelize.INTEGER(1)
      },
      firm_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      attorney_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      code: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      designation_id: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      first_name: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      dob: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      social_security_no: {
        type: Sequelize.INTEGER(10)
      },
      company_name: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      address_line_1: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      address_line_2: {
        type: Sequelize.TEXT
      },
      address_line_3: {
        type: Sequelize.TEXT
      },
      country_id: {
        allowNull: true,
        type: Sequelize.INTEGER(11)
      },
      city_id: {
        allowNull: true,
        type: Sequelize.INTEGER(11)
      },
      state_id: {
        allowNull: true,
        type: Sequelize.INTEGER(11)
      },
      postal_code: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      phone: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      mobile_cell: {
        type: Sequelize.STRING
      },
      website_url: {
        type: Sequelize.STRING
      },
      social_media_url: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      youtube: {
        type: Sequelize.STRING
      },
      google: {
        type: Sequelize.STRING
      },
      im: {
        type: Sequelize.STRING
      },
      association_status: {
        type: Sequelize.STRING
      },
      industry_type: {
        type: Sequelize.INTEGER
      },
      remarks_notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status:{
        allowNull: false,
        type: Sequelize.INTEGER(1),
        defaultValue: 0
      },
      record_type:{
          allowNull: true,
          type: Sequelize.ENUM('M', 'R', 'C', 'T')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mastercontacts');
  }
};

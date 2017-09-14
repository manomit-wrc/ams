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
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      dob: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      social_security_no: {
        allowNull: false,
        type: Sequelize.INTEGER(10)
      },
      company_name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      address_line_1: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      address_line_2: {
        type: Sequelize.TEXT
      },
      address_line_3: {
        type: Sequelize.TEXT
      },
<<<<<<< HEAD
      country: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(255)
=======
      country_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
      },
      state_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11)
>>>>>>> 3492dfeee50c30cf6e441c342a52b1cd956a4491
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('mastercontacts');
  }
};

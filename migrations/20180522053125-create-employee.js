'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      designation_id: {
        type: Sequelize.INTEGER
      },
      firm_id: {
        type: Sequelize.INTEGER
      },
      emp_staff_id: {
        type: Sequelize.STRING
      },
      emp_staff_code: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      education: {
        type: Sequelize.STRING
      },
      emp_staff_title: {
        type: Sequelize.STRING
      },
      job_type_id: {
        type: Sequelize.INTEGER
      },
      firm_join_date: {
        type: Sequelize.STRING
      },
      staff_experience: {
        type: Sequelize.STRING
      },
      salary_cost: {
        type: Sequelize.STRING
      },
      benefir_cost: {
        type: Sequelize.STRING
      },
      overhead_factor: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      web_url: {
        type: Sequelize.STRING
      },
      social_url: {
        type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      address_3: {
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      pincode: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employees');
  }
};
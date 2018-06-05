'use strict';
module.exports = (sequelize, DataTypes) => {
  var employee = sequelize.define('employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    designation_id: DataTypes.INTEGER,
    firm_id: DataTypes.INTEGER,
    emp_staff_id: DataTypes.STRING,
    emp_staff_code: DataTypes.STRING,
    gender: DataTypes.STRING,
    education: DataTypes.STRING,
    emp_staff_title: DataTypes.STRING,
    job_type_id: DataTypes.INTEGER,
    firm_join_date: DataTypes.STRING,
    staff_experience: DataTypes.STRING,
    salary_cost: DataTypes.STRING,
    benefir_cost: DataTypes.STRING,
    overhead_factor: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    mobile: DataTypes.STRING,
    web_url: DataTypes.STRING,
    social_url: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    address_3: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    pincode: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  employee.associate = function(models) {
    // associations can be defined here
  };
  return employee;
};
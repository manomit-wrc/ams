module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('admin', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        last_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        address: {
            type: Sequelize.TEXT
        },
        phone_no: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        status: {
            type: Sequelize.ENUM('1', '0'),
            defaultValue: '1'
        }
 
 
    });
 
    return User;
 
}
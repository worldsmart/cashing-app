const Sequelize = require('sequelize');
const sequelize = require('../db');

UserRoles = Object.freeze({
    ACCOUNTANT: 'accountant',
    CASHIER: 'cashier',
    BEARER: 'bearer'
});

let User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
});

module.exports = User;
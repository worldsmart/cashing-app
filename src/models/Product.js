const Sequelize = require('sequelize');
const sequelize = require('../db');

let Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        required: true
    }
});

module.exports = Product;
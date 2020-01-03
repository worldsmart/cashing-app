const Sequelize = require('sequelize');
const sequelize = require('../db');
const Order = require('./Order');

let Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
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

Product.hasMany(Order, {foreignKey: 'product_id', sourceKey: 'id'});
Order.belongsTo(Product, {foreignKey: 'product_id', sourceKey: 'id'});

module.exports = Product;
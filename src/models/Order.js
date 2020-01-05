const Sequelize = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

OrderStates = Object.freeze({
    NEW: 'created',
    RECEIVED: 'received',
    WAITING_FOR_PAYMENT: 'waiting for payment',
    CONFIRMED: 'confirmed'
});

let Order = sequelize.define('order', {
    product_id:{
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        defaultValue: OrderStates.NEW,
        allowNull: false
    },
    invoice:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    customer:{
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    }
});

module.exports = Order;
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const { db } = require('../config');

let sequelize = new Sequelize(process.env.DB_DATABASE || db.database, process.env.DB_USER || db.user, process.env.DB_PASSWORD || db.password, {
    host: process.env.DB_HOST || db.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    retry: {
        max: 8
    },
    logging: false
});

let models = {};

fs.readdirSync(path.join(__dirname, 'models')).forEach((file)=>{
    file = file.substring(0, file.indexOf('.'));
    models[file] = require('./models/' + file)(sequelize, Sequelize);
});

models.Product.hasMany(models.Order, {foreignKey: 'product_id', sourceKey: 'id'});
models.Order.belongsTo(models.Product, {foreignKey: 'product_id', sourceKey: 'id'});

module.exports = models;
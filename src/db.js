const Sequelize = require('sequelize');
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

sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to database.');
    })
    .catch(err => {
        console.error('Unable connect to database.');
        process.exit(1);
    });

module.exports = sequelize;
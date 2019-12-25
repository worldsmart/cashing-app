const Sequelize = require('sequelize');
const { db } = require('../config');

let sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    User.create({
        firstName: 'John',
        lastName: 'Hancock'
    }).then(user=>{console.log(user)}).catch(err=>{console.log(err)})
});
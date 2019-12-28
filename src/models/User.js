const Sequelize = require('sequelize');
const sequelize = require('../db');

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

/*User.sync().then(_=>{
    User.create({name: 'Jon Miller', phone: '0994960855', username: '45a62', password: '12345', role: 'cashier'}).then(user=>{
        console.log(user);
    }).catch(err=>{
        console.log(err);
    });
});*/

module.exports = User;
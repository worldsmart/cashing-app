console.log('Running seeds');
const User = require('../models/User');

module.exports.usersSet = usersSet = ()=>{
    User.sync({force: true}).then(_=>{
        User.bulkCreate([
            {name: 'Default Accountant', phone: 'none', username: 'accountant', password: '12345', role: 'accountant'},
            {name: 'Default Cashier', phone: 'none', username: 'cashier', password: '12345', role: 'cashier'},
            {name: 'Default Bearer', phone: 'none', username: 'bearer', password: '12345', role: 'bearer'},])
            .then((users)=>{
                console.log('Default users created:');
                console.log(users[0].dataValues);
                console.log(users[1].dataValues);
                console.log(users[2].dataValues);
            }).catch((err)=>{
            throw err;
        });
    });
};

User.findOne().then((user)=>{
    if(!user){
        usersSet();
    }
});
console.log('Running seeds');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.usersSet = usersSet = ()=>{
    return new Promise(resolve => {
        User.sync({force: true}).then(_=>{
            User.bulkCreate([
                {name: 'Default Accountant', phone: 'none', username: 'accountant', password: '12345', role: 'accountant'},
                {name: 'Default Cashier', phone: 'none', username: 'cashier', password: '12345', role: 'cashier'},
                {name: 'Default Bearer', phone: 'none', username: 'bearer', password: '12345', role: 'bearer'}])
                .then((users)=>{
                    console.log('Default users created:');
                    for(let i = 0;i < users.length;i++){
                        console.log(users[i].dataValues);
                    }
                    resolve();
                }).catch((err)=>{
                    process.exit(1);
                });
        });
    });
};

module.exports.productsSet = productsSet = ()=>{
    return new Promise(resolve => {
        Product.sync({force: true}).then(_=>{
            Product.bulkCreate([
                {name: 'Stove', price:'1800'},
                {name: 'Oven', price:'2623'},
                {name: 'Sink', price:'3245'},
                {name: 'Fridge', price:'1345'},
                {name: 'Cabinet', price:'942'},
                {name: 'Dishwasher', price:'2943'},
                {name: 'Washing machine', price:'4363'},
                {name: 'Toaster', price:'423'},
                {name: 'Chair', price:'153'},
                {name: 'TV set', price:'2344'},
                {name: 'Plate', price:'45'},
                {name: 'Cup', price:'20'}])
                .then((products)=>{
                    console.log('Default products created:');
                    for(let i = 0;i < products.length;i++){
                        console.log(products[i].dataValues);
                    }
                    resolve();
                }).catch((err)=>{
                    process.exit(1);
                });
        });
    });
};

User.sync().then(()=>{
    User.findOne().then((user)=>{
        if(!user){
            usersSet();
        }
    });
});

Product.sync().then(()=>{
    Product.findOne().then((product)=>{
        if(!product){
            productsSet();
        }
    });
});
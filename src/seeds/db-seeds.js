console.log('Running seeds');
const { usersSet, productsSet, ordersSet } = require('./index');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

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

Order.sync().then(()=>{
    Order.findOne().then((order)=>{
        if(!order){
            ordersSet();
        }
    });
});
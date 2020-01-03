const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

Order.sync({force:true}).then(()=>{
    Order.create({
        product_id: 11,
        customer: "Jon Miller"
    }).then((user)=>{
        Order.findAll({
            include:[{
                model: Product,
                attributes: ['name', 'price']
            }]
        }).then((data)=>{
            console.log(data[0].dataValues)
        })
    });
});

module.exports = router;
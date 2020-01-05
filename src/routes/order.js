const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { Op } = require('sequelize');

router.put('/create', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.CASHIER){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    if(!req.body.product_id || !req.body.customer){
        next({
            code: 400,
            text: 'Fields [product_id, customer] required'
        });
        return;
    }
    Product.findOne({
        where:{
            id: req.body.product_id
        }
    }).then((product)=>{
        if(!product){
            next({
                code: 400,
                text: 'No product with such id'
            });
            return;
        }
        Order.create({
            product_id: req.body.product_id,
            customer: req.body.customer
        }).then((order)=>{
            res.json({
                msg: 'Order successfully created',
                order: order
            });
        });
    });
});

router.put('/receipt', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.BEARER){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    if(!req.body.id){
        next({
            code: 400,
            text: 'Field [id] required'
        });
        return;
    }
    Order.findOne({
        where:{
            id: req.body.id
        }
    }).then((order)=>{
        if(!order){
            next({
                code: 400,
                text: 'No order with such id'
            });
            return;
        }
        if(order.status !== OrderStates.NEW){
            next({
                code: 400,
                text: 'Bad status of order for confirmation'
            });
            return;
        }
        order.update({
            status: OrderStates.RECEIVED
        }).then(()=>{
            res.json({
                msg: 'Status of order successfully updated'
            });
        });
    });
});

router.put('/invoice', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.CASHIER){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    if(!req.body.id){
        next({
            code: 400,
            text: 'Field [id] required'
        });
        return;
    }
    Order.findOne({
        where:{
            id: req.body.id
        },
        include: {
            model: Product,
            attributes: ['name', 'price', 'createdAt']
        },
    }).then((order)=>{
        if(!order){
            next({
                code: 400,
                text: 'No order with such id'
            });
            return;
        }
        if(new Date() - order.product.createdAt > 2592000000){
            order.product.price *= 0.8;
        }
        if(order.status === OrderStates.RECEIVED){
            order.update({
                invoice: new Date(),
                status: OrderStates.WAITING_FOR_PAYMENT
            }).then((order)=>{
                res.json({
                    id: order.id,
                    product: order.product.name,
                    price: order.product.price,
                    customer: order.customer,
                    invoiceDate: order.invoice,
                    createdAt: order.createdAt
                });
            });
        }else if(order.status === OrderStates.WAITING_FOR_PAYMENT){
            res.json({
                id: order.id,
                product: order.product.name,
                price: order.product.price,
                customer: order.customer,
                invoiceDate: order.invoice,
                createdAt: order.createdAt
            });
        }else {
            next({
                code: 400,
                text: 'Bad status of order for generate invoice'
            });
        }
    });
});

router.put('/confirm', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.CASHIER){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    if(!req.body.id){
        next({
            code: 400,
            text: 'Field [id] required'
        });
        return;
    }
    Order.findOne({
        where:{
            id: req.body.id
        }
    }).then((order)=>{
        if(!order){
            next({
                code: 400,
                text: 'No order with such id'
            });
            return;
        }
        if(order.status !== OrderStates.WAITING_FOR_PAYMENT){
            next({
                code: 400,
                text: 'Bad status of order for generate invoice'
            });
            return;
        }
        order.update({
            status: OrderStates.CONFIRMED
        }).then(()=>{
            res.json({
                msg: 'Payment accepted'
            })
        });
    });
});

router.put('/list', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.ACCOUNTANT){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }

    let datePattern = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
    let where = {};

    if(req.body.from && req.body.to){
        if(!datePattern.test(req.body.from) || !datePattern.test(req.body.to)){
            next({
                code: 400,
                text: 'Bad date type. Required type: YYYY-MM-DD'
            });
            return;
        }
        where = {
            createdAt: {
                [Op.between]: [
                    req.body.from,
                    req.body.to
                ]
            }
        };
    }else if(req.body.from){
        if(!datePattern.test(req.body.from)){
            next({
                code: 400,
                text: 'Bad date type. Required type: YYYY-MM-DD'
            });
            return;
        }
        where = {
            createdAt: {
                [Op.gte]: req.body.from
            }
        };
    }else if(req.body.to){
        if(!datePattern.test(req.body.to)){
            next({
                code: 400,
                text: 'Bad date type. Required type: YYYY-MM-DD'
            });
            return;
        }
        where = {
            createdAt: {
                [Op.lte]: req.body.to
            }
        };
    }

    Order.findAll({
        where: where,
        include: {
            model: Product
        },
        order:[
            ['id', 'DESC']
        ]
    }).then((orders)=>{
        res.json(orders);
    });
});

module.exports = router;
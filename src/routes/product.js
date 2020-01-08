const router = require('express').Router();
const { Product } = require('../db');

router.put('/', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.ACCOUNTANT){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    if(!req.body.operation){
        next({
            code: 400,
            text: 'Field [operation] required'
        });
        return;
    }
    if(req.body.operation === 'remove'){
        if(!req.body.id){
            next({
                code: 400,
                text: 'Field [id] required for remove operation'
            });
            return;
        }
        Product.destroy({
            where:{
                id: req.body.id
            }
        }).then((product)=>{
            if(!product){
                next({
                    code: 400,
                    text: 'No product with such id'
                });
                return;
            }
            res.json({msg:'Product successfully deleted'})
        })
    }else if(req.body.operation === 'add'){
        if(!req.body.name || !req.body.price){
            next({
                code: 400,
                text: 'Field [name, price] required for add operation'
            });
            return;
        }
        Product.create({
            name: req.body.name,
            price: req.body.price
        }).then((product)=>{
            res.json({
                msg:'Product successfully created',
                product: product
            });
        });
    }else {
        next({
            code: 400,
            text: 'Product only contains [add, remove] operations'
        });
    }
});

router.get('/list', (req, res, next)=>{
    Product.findAll().then((products)=>{
        res.json(products);
    });
});

module.exports = router;
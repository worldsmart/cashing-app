const router = require('express').Router();
const User = require('../models/User');
const { token } = require('../jwt');

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
        User.destroy({
            where:{
                id:req.body.id
            }
        }).then((user)=>{
            if(!user){
                next({
                    code: 400,
                    text: 'No user with such id'
                });
                return;
            }
            res.json({msg:'User successfully deleted'})
        });
    }else if(req.body.operation === 'add'){
        if(!req.body.name || !req.body.phone ||!req.body.username ||!req.body.password ||!req.body.role){
            next({
                code: 400,
                text: 'Field [name, phone, username, password, role] required for add operation'
            });
            return;
        }
        User.create({
            name: req.body.name,
            phone: req.body.phone,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        }).then((user)=>{
            token(user).then((jwt)=>{
                res.json({
                    msg:'User successfully created',
                    user: user,
                    token: jwt
                });
            }).catch((err)=>{
                next({
                    code: 500,
                    text: err.message
                });
            });
        });
    }else {
        next({
            code: 400,
            text: 'User only contains [add, remove] operations'
        });
    }
});

router.get('/list', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== UserRoles.ACCOUNTANT){
        next({
            code: 403,
            text: 'Not enough rights for this operation'
        });
        return;
    }
    User.findAll().then((users)=>{
        res.json(users);
    });
});

router.put('/authorization', (req, res, next)=>{
    if(!req.body.username || !req.body.password){
        next({
            code: 400,
            text: 'Fields [username, password] required'
        });
        return;
    }
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        attributes: ['username', 'password']
    }).then((user)=>{
        if(!user){
            next({
                code: 401,
                text: 'Unauthorized. Wrong username or password.'
            });
            return;
        }
        token(user.dataValues).then((token)=>{
            res.json({
                token: token
            });
        }).catch((err)=>{
            next({
                code: 500,
                text: err.message
            });
        });
    });
});

module.exports = router;
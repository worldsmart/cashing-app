const router = require('express').Router();
const User = require('../models/User');
const { token } = require('../jwt');

router.get('/list', (req, res, next)=>{
    const { user } = res.locals;
    if(user.role !== 'accountant'){
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
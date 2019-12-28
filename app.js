const express = require('express');
const bodyParser  = require('body-parser');
const User = require('./src/models/User');
const { decode } = require('./src/jwt');

//express usage
const app = express();

//body parser usage
app.use(bodyParser.json());

//authorization middleware
app.use((req, res, next)=>{
    if(req.url === '/user/authorization'){
        next();
    }else if(!req.headers.authorization){
        res.status(401).send('Authorization header required');
    }else {
        decode(req.headers.authorization)
            .then((decoded)=>{
                User.findOne({
                    where: {
                        username: decoded.username,
                        password: decoded.password
                    },
                    attributes: ['username', 'password', 'role']
                }).then((user)=>{
                    if(!user){
                        res.status(401).send('Unauthorized. Bad authorization token.');
                        return;
                    }
                    res.locals.user = user.dataValues;
                    next();
                });
            })
            .catch((err)=>{
                res.status(500).send(err.message);
            });
    }
});

//router including
const router = require('./src/router');
app.all('*', router);

//error handler for undefined references
app.all('*', (req, res, next)=>{
    next({
        code: 404,
        text: 'Not Found'
    });
});

//error  handler middleware
app.use((err, req, res, next)=>{
    res.status(err.code).send(err.text);
});

//server enable
app.listen(8080, ()=>{
    console.log('App started on port:', process.env.DEPLOYED_TO ? process.env.DEPLOYED_TO : 8080);
});
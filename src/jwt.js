const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports.token = (data)=>{
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret,(err,token)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(token);
            }
        });
    });
};

module.exports.decode = (token)=>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(decoded);
            }
        });
    });
};
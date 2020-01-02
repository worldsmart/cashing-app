const router = require('express').Router();

const user = require('./routes/user');
router.use('/user', user);

const product = require('./routes/product');
router.use('/product', product);

module.exports = router;
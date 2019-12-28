const router = require('express').Router();

const user = require('./routes/user');
router.use('/user', user);

module.exports = router;
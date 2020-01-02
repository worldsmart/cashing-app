const reset = require('./db-seeds');

reset.usersSet().then(()=>{
    reset.productsSet();
});
const reset = require('./index');

reset.usersSet().then(()=>{
    reset.productsSet().then(()=>{
        reset.ordersSet();
    });
});
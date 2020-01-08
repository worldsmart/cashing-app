const { Product, User, Order } = require('../db');

module.exports.usersSet = ()=>{
    return new Promise(resolve => {
        User.sync({force: true}).then(_=>{
            User.bulkCreate([
                {name: 'Default Accountant', phone: 'none', username: UserRoles.ACCOUNTANT, password: '12345', role: UserRoles.ACCOUNTANT},
                {name: 'Default Cashier', phone: 'none', username: UserRoles.CASHIER, password: '12345', role: UserRoles.CASHIER},
                {name: 'Default Bearer', phone: 'none', username: UserRoles.BEARER, password: '12345', role: UserRoles.BEARER}])
                .then((users)=>{
                    console.log('Default users created:');
                    for(let i = 0;i < users.length;i++){
                        console.log(users[i].dataValues);
                    }
                    resolve();
                }).catch((err)=>{
                process.exit(1);
            });
        });
    });
};

module.exports.productsSet = ()=>{
    return new Promise(resolve => {
        let oldProductDate = new Date('2019-10-15');
        Product.sync({force: true}).then(_=>{
            Product.bulkCreate([
                {name: 'Stove', price:'1800', createdAt: oldProductDate},
                {name: 'Oven', price:'2623', createdAt: oldProductDate},
                {name: 'Sink', price:'3245', createdAt: oldProductDate},
                {name: 'Fridge', price:'1345', createdAt: oldProductDate},
                {name: 'Cabinet', price:'942'},
                {name: 'Dishwasher', price:'2943'},
                {name: 'Washing machine', price:'4363'},
                {name: 'Toaster', price:'423'},
                {name: 'Chair', price:'153'},
                {name: 'TV set', price:'2344'},
                {name: 'Plate', price:'45'},
                {name: 'Cup', price:'20'}])
                .then((products)=>{
                    console.log('Default products created:');
                    for(let i = 0;i < products.length;i++){
                        console.log(products[i].dataValues);
                    }
                    resolve();
                }).catch((err)=>{
                process.exit(1);
            });
        });
    });
};

module.exports.ordersSet = ()=>{
    return new Promise(resolve => {
        Order.sync({force:true}).then(_=>{
            let date = new Date();
            let oldOrderDate = new Date('2019-10-15');
            Order.bulkCreate([
                {product_id: 8, customer: 'Пилипейко Платон', invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 1, customer: 'Шубин Василий', invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 5, customer: 'Andre', invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 12, customer: 'Щербаков Рафаил', status: OrderStates.RECEIVED},
                {product_id: 4, customer: 'Коровяк Зуфар', status: OrderStates.RECEIVED},
                {product_id: 8, customer: 'Шкраба Чарльз', status: OrderStates.RECEIVED},
                {product_id: 4, customer: 'Якушев Дан', status: OrderStates.RECEIVED},
                {product_id: 9, customer: 'Веселов Рафаил', status: OrderStates.RECEIVED},
                {product_id: 10, customer: 'Большаков Устин', status: OrderStates.WAITING_FOR_PAYMENT, invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 11, customer: 'Предыбайло Динар', status: OrderStates.WAITING_FOR_PAYMENT, invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 3, customer: 'Гелетей Глеб', status: OrderStates.WAITING_FOR_PAYMENT, invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 2, customer: 'Лукашенко Нестор', status: OrderStates.WAITING_FOR_PAYMENT, invoice: date},
                {product_id: 1, customer: 'Кириллов Шарль', status: OrderStates.WAITING_FOR_PAYMENT, invoice: date},
                {product_id: 5, customer: 'Ковалёв Елисей', status: OrderStates.WAITING_FOR_PAYMENT, invoice: date},
                {product_id: 7, customer: 'Беляков Григорий', status: OrderStates.CONFIRMED, invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 9, customer: 'Токар Йоган', status: OrderStates.CONFIRMED, invoice: oldOrderDate, createdAt: oldOrderDate},
                {product_id: 4, customer: 'Мазайло Роман', status: OrderStates.CONFIRMED, invoice: date},
                {product_id: 12, customer: 'Гончар Дан', status: OrderStates.CONFIRMED, invoice: date},
                {product_id: 11, customer: 'Гусев Клаус'},
                {product_id: 8, customer: 'Власов Устин'}
            ]).then((orders)=>{
                console.log('Default orders created:');
                for(let i = 0;i < orders.length;i++){
                    console.log(orders[i].dataValues);
                }
                resolve();
            }).catch((err)=>{
                process.exit(1);
            });
        });
    });
};
const SequelizeMock = require('sequelize-mock');
const expect = require('chai').expect;
const faker = require('faker');

describe('DB models testing:', function() {
    let DBConnectionMock = new SequelizeMock();

    describe('User model:', function() {
        const User = require('../src/models/User')(DBConnectionMock, SequelizeMock);

        const newUser = {
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            role: faker.name.jobTitle()
        };

        it('should create user', async function() {
            let user = await User.create(newUser);

            expect(user).to.exist;
            expect(user).to.be.a('object');
            expect(user.dataValues).to.have.all.keys('name', 'phone', 'username', 'password', 'role', 'id', 'createdAt', 'updatedAt');
            expect(user.get('name')).to.equal(newUser.name);
        });

        it('should get list of users', async function() {
            let users = await User.findAll();

            expect(users).to.exist;
            expect(users).to.be.a('array');
            expect(users[0]).to.exist;
            expect(users[0]).to.be.a('object');
            expect(users[0].dataValues).to.have.all.keys('name', 'phone', 'username', 'password', 'role', 'id', 'createdAt', 'updatedAt');
        });

        it('should get user by id', async function() {
            let user = await User.findOne({
                where:{
                    id: 1
                }
            });

            expect(user).to.exist;
            expect(user).to.be.a('object');
            expect(user.get('id')).to.equal(1);
            expect(user.dataValues).to.have.all.keys('name', 'phone', 'username', 'password', 'role', 'id', 'createdAt', 'updatedAt');
        });

        it('should remove user', async function() {
            let status = await User.destroy({
                where:{
                    id: 1
                }
            });

            expect(status).to.exist;
            expect(status).to.be.a('number');
            expect(status).to.be.equal(1);
        });
    });

    describe('Product model:', function() {
        const Product = require('../src/models/Product')(DBConnectionMock, SequelizeMock);

        const newProduct = {
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        };

        it('should create product', async function() {
            let product = await Product.create(newProduct);

            expect(product).to.exist;
            expect(product).to.be.a('object');
            expect(product.dataValues).to.have.all.keys('name', 'price', 'id', 'createdAt', 'updatedAt');
            expect(product.get('name')).to.equal(newProduct.name);
        });

        it('should get list of products', async function() {
            let products = await Product.findAll();

            expect(products).to.exist;
            expect(products).to.be.a('array');
            expect(products[0]).to.exist;
            expect(products[0]).to.be.a('object');
            expect(products[0].dataValues).to.have.all.keys('name', 'price', 'id', 'createdAt', 'updatedAt');
        });

        it('should get product by id', async function() {
            let product = await Product.findOne({
                where:{
                    id: 1
                }
            });

            expect(product).to.exist;
            expect(product).to.be.a('object');
            expect(product.get('id')).to.equal(1);
            expect(product.dataValues).to.have.all.keys('name', 'price', 'id', 'createdAt', 'updatedAt');
        });

        it('should remove product', async function() {
            let status = await Product.destroy({
                where:{
                    id: 1
                }
            });

            expect(status).to.exist;
            expect(status).to.be.a('number');
            expect(status).to.be.equal(1);
        });
    });

    describe('Order model:', function() {
        const Order = require('../src/models/Order')(DBConnectionMock, SequelizeMock);

        const newOrder = {
            product_id: faker.random.number(),
            customer: faker.name.firstName() + ' ' + faker.name.lastName()
        };

        it('should create order', async function() {
            let order = await Order.create(newOrder);

            expect(order).to.exist;
            expect(order).to.be.a('object');
            expect(order.dataValues).to.have.all.keys('product_id', 'customer', 'status', 'invoice', 'id', 'createdAt', 'updatedAt');
            expect(order.get('customer')).to.equal(newOrder.customer);
        });

        it('should get list of orders', async function() {
            let orders = await Order.findAll();

            expect(orders).to.exist;
            expect(orders).to.be.a('array');
            expect(orders[0]).to.exist;
            expect(orders[0]).to.be.a('object');
            expect(orders[0].dataValues).to.have.all.keys('product_id', 'customer', 'status', 'invoice', 'id', 'createdAt', 'updatedAt');
        });

        it('should get order by id', async function() {
            let order = await Order.findOne({
                where:{
                    id: 1
                }
            });

            expect(order).to.exist;
            expect(order).to.be.a('object');
            expect(order.get('id')).to.equal(1);
            expect(order.dataValues).to.have.all.keys('product_id', 'customer', 'status', 'invoice', 'id', 'createdAt', 'updatedAt');
        });

        it('should change status of order', async function() {
            let order = await Order.findOne({
                where:{
                    id: 1
                }
            });

            expect(order).to.exist;
            expect(order).to.be.a('object');
            expect(order.get('id')).to.equal(1);
            expect(order.dataValues).to.have.all.keys('product_id', 'customer', 'status', 'invoice', 'id', 'createdAt', 'updatedAt');

            let changed = await order.update({
                status: OrderStates.CONFIRMED
            });

            expect(changed).to.exist;
            expect(changed).to.be.a('object');
            expect(changed.get('status')).to.equal(OrderStates.CONFIRMED);
            expect(changed.dataValues).to.have.all.keys('product_id', 'customer', 'status', 'invoice', 'id', 'createdAt', 'updatedAt');
        });

        it('should remove order', async function() {
            let status = await Order.destroy({
                where:{
                    id: 1
                }
            });

            expect(status).to.exist;
            expect(status).to.be.a('number');
            expect(status).to.be.equal(1);
        });
    });
});
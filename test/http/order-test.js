const faker = require('faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

describe('Routes : /order', function (){
    const app = require('../../app');
    const jwt = require('jsonwebtoken');
    const { User, Order, Product } = require('../../src/db');

    beforeEach(() => {
        this.jwt = sinon.stub(jwt, 'verify').callsFake((token, secret, callback)=>{
            callback(false, true);
        });
    });

    afterEach(() => {
        this.jwt.restore();
    });

    describe('PUT /create', function (){
        let query;

        beforeEach(() => {
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.CASHIER
                }
            });
            this.product = sinon.stub(Product, 'findOne').resolves(1);
            this.order = sinon.stub(Order, 'create').resolves({});
        });

        afterEach(() => {
            query.restore();
            this.product.restore();
            this.order.restore();
        });

        it('should create order', function (done){
            chai.request(app)
                .put('/order/create')
                .set('Authorization', 'text')
                .send({
                    product_id: faker.random.number(),
                    customer: faker.name.firstName()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.ACCOUNTANT
                }
            });

            chai.request(app)
                .put('/order/create')
                .set('Authorization', 'text')
                .send({
                    product_id: faker.random.number(),
                    customer: faker.name.firstName()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of query parameters', function (done){
            chai.request(app)
                .put('/order/create')
                .set('Authorization', 'text')
                .send({
                    product_id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /receipt', function (){
        let query;

        beforeEach(() => {
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.BEARER
                }
            });
            this.order = sinon.stub(Order, 'findOne').resolves({
                status: OrderStates.NEW,
                update: (param)=>{return new Promise(resolve => resolve())}
            });
        });

        afterEach(() => {
            query.restore();
            this.order.restore();
        });

        it('should change order state to received', function (done){
            chai.request(app)
                .put('/order/receipt')
                .set('Authorization', 'text')
                .send({
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.CASHIER
                }
            });

            chai.request(app)
                .put('/order/receipt')
                .set('Authorization', 'text')
                .send({
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of query parameters', function (done){
            chai.request(app)
                .put('/order/receipt')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /invoice', function (){
        let query;

        beforeEach(() => {
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.CASHIER
                }
            });
            this.order = sinon.stub(Order, 'findOne').resolves({
                status: OrderStates.WAITING_FOR_PAYMENT,
                product:{
                    createdAt: new Date()
                }
            });
        });

        afterEach(() => {
            query.restore();
            this.order.restore();
        });

        it('should create invoice and add invoice generation date', function (done){
            chai.request(app)
                .put('/order/invoice')
                .set('Authorization', 'text')
                .send({
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.BEARER
                }
            });

            chai.request(app)
                .put('/order/invoice')
                .set('Authorization', 'text')
                .send({
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of query parameters', function (done){
            chai.request(app)
                .put('/order/invoice')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /confirm', function (){
        let query;

        beforeEach(() => {
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.CASHIER
                }
            });
            this.order = sinon.stub(Order, 'findOne').resolves({
                status: OrderStates.WAITING_FOR_PAYMENT,
                update: (param)=>{return new Promise(resolve => resolve())}
            });
        });

        afterEach(() => {
            query.restore();
            this.order.restore();
        });

        it('should change state of order to confirmed', function (done){
            chai.request(app)
                .put('/order/confirm')
                .set('Authorization', 'text')
                .send({
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.BEARER
                }
            });

            chai.request(app)
                .put('/order/confirm')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of query parameters', function (done){
            chai.request(app)
                .put('/order/confirm')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });

    describe('PUT /list', function (){
        let query;

        beforeEach(() => {
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.ACCOUNTANT
                }
            });
            this.order = sinon.stub(Order, 'findAll').resolves({});
        });

        afterEach(() => {
            query.restore();
            this.order.restore();
        });

        it('should return list of orders', function (done){
            chai.request(app)
                .put('/order/list')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues:{
                    role: UserRoles.BEARER
                }
            });

            chai.request(app)
                .put('/order/list')
                .set('Authorization', 'text')
                .send({})
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due poor date types', function (done){
            chai.request(app)
                .put('/order/list')
                .set('Authorization', 'text')
                .send({
                    from: '20-20-2018'
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });
});
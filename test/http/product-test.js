const faker = require('faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

describe('Routes : /product', function (){
    const app = require('../../app');
    const jwt = require('jsonwebtoken');
    const { User, Product } = require('../../src/db');

    const user = {
        dataValues:{
            username: faker.internet.userName(),
            password: faker.internet.password(),
            role: UserRoles.ACCOUNTANT
        }
    };

    let query;

    beforeEach(() => {
        this.jwt = sinon.stub(jwt, 'verify').callsFake((token, secret, callback)=>{
            callback(false, true);
        });
        query = sinon.stub(User, 'findOne').resolves(user);
    });

    afterEach(() => {
        this.jwt.restore();
        query.restore();
    });

    describe('PUT /', function (){
        it('should add product', function (done){
            let create = sinon.stub(Product, 'create').resolves({});

            chai.request(app)
                .put('/product')
                .set('Authorization', 'text')
                .send({
                    operation: 'add',
                    name: faker.commerce.productName(),
                    price: faker.commerce.price()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    create.restore();
                    done();
                });
        });

        it('should remove product', function (done){
            let destroy = sinon.stub(Product, 'destroy').resolves(1);

            chai.request(app)
                .put('/product')
                .set('Authorization', 'text')
                .send({
                    operation: 'remove',
                    id: faker.random.number()
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    destroy.restore();
                    done();
                });
        });

        it('should fail due to lack of user rights', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({
                dataValues: {
                    role: UserRoles.CASHIER
                }
            });

            chai.request(app)
                .put('/product')
                .set('Authorization', 'text')
                .send({
                    operation: 'remove',
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
                .put('/product')
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

    describe('GET /list', function (){
        it('should get product list', function (done){
            let findAll = sinon.stub(Product, 'findAll').resolves({});

            chai.request(app)
                .get('/product/list')
                .set('Authorization', 'text')
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    findAll.restore();
                    done();
                });
        });
    });
});
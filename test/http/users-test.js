const faker = require('faker');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

describe('Routes : /user', function (){
    const app = require('../../app');
    const jwt = require('jsonwebtoken');
    const { User } = require('../../src/db');

    let query;
    const user = {
        dataValues:{
            username: faker.internet.userName(),
            password: faker.internet.password(),
            role: UserRoles.ACCOUNTANT
        }
    };

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
        it('should add user', function (done){
            const add = sinon.stub(User, 'create').resolves(user);

            chai.request(app)
                .put('/user')
                .set('Authorization', 'text')
                .send({
                    operation: 'add',
                    name: faker.name.firstName(),
                    phone: faker.phone.phoneNumber(),
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    role: UserRoles.ACCOUNTANT
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    add.restore();
                    done();
                });
        });

        it('should remove user', function (done){
            const destroy = sinon.stub(User, 'destroy').resolves(true);

            chai.request(app)
                .put('/user')
                .set('Authorization', 'text')
                .send({
                    operation: 'remove',
                    id: 123
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    destroy.restore();
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
                .put('/user')
                .set('Authorization', 'text')
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
                .put('/user')
                .set('Authorization', 'text')
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of targeted user', function (done){
            const destroy = sinon.stub(User, 'destroy').resolves(false);

            chai.request(app)
                .put('/user')
                .set('Authorization', 'text')
                .send({
                    operation: 'remove',
                    id: 123
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    destroy.restore();
                    done();
                });
        });
    });

    describe('PUT /authorization', function (){
        beforeEach(() => {
            query.restore();
            query = sinon.stub(User, 'findOne').resolves(user);
        });

        afterEach(() => {
            query.restore();
        });

        it('should return a token with user', function (done){
            chai.request(app)
                .put('/user/authorization')
                .send({
                    'username': 'text',
                    'password': 'text'
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    done();
                });
        });

        it('should fail due to lack of query parameters', function (done){
            chai.request(app)
                .put('/user/authorization')
                .send({
                    'username': 'text'
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due to lack of user', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves();

            chai.request(app)
                .put('/user/authorization')
                .send({
                    'username': 'text',
                    'password': 'text'
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });

        it('should fail due err of database', function (done){
            query.restore();
            query = sinon.stub(User, 'findOne').resolves({});

            chai.request(app)
                .put('/user/authorization')
                .send({
                    'username': 'text',
                    'password': 'text'
                })
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });

    describe('GET /list', function (){
        beforeEach(() => {
            this.query = sinon.stub(User, 'findAll').resolves([user]);
        });

        afterEach(() => {
            this.query.restore();
        });

        it('should get users list', function (done){
            chai.request(app)
                .get('/user/list')
                .set('Authorization', 'text')
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
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
                .get('/user/list')
                .set('Authorization', 'text')
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.exist;
                    expect(res.text).to.be.a('string');
                    done();
                });
        });
    });
});
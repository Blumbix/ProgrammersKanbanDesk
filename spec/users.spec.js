'use strict';

const mongoose = require('../src/services/mongoose');
const request = require('supertest');
const chai = require('chai');
const app = require('../src/app');

const expect = chai.expect;

// przeglad assercji: https://www.chaijs.com/api/bdd/

describe('Users API integrations tests', () => {

    before((done) => {
        mongoose.connection.collections.users.remove(() => { done() });
    });

    describe('#GET /api/users', () => {
        it('should get empty users array', (done) => {
            request(app).get('/api/users')
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });


    describe('#POST /api/users', () => {
        it('should add an user', (done) => {
            request(app).post('/api/users')
                .send({username: 'Piotrek', email: 'piotrek@gmail.com', password: 'Rodzen'})
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.user).to.have.all.keys(['id', 'username', 'email']);
                    done();
                });
        });

        it('should return 400 when user does not have a data', (done) => {
            request(app).post('/api/users')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    done();
                });
        });
    });

    describe('#GET /api/users', () => {
        it('should have pagination headers', (done) => {
            request(app).get('/api/users')
                .end((err, res) =>  {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    done();
                });
        });
    });

});

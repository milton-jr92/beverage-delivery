const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

let route = '/v1/order'

describe(`POST ${route}`, function () {
    it('should register the delivery order', function (done) {
        var app = express();

        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());

        consign()
            .include('routes')
            .include('control')
            .include('utils')    
            .into(app);        

        request(app)
            .post(route)
            .send({
                "store": "Test",
                "location": "A",
                "quantity": 30
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});
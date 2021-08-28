const graph = require('../models/location');
const findShortestPath = require('../service/shortestDistance');
const cargoCapacity = require('../models/cargoCapacity');
const distanceTable = require('../models/distanceTable');
const score = require('../service/score');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

let route = '/v1/order/1/vehicle/ranking'

let order = {
    "store": "Store Test",
    "location": "E",
    "quantity": 30
}

let vehicle = {
    "model": "A100",
    "location": "A",
    "type": "E"
}

let shortestPath = 'infinity',
    cargo = null,
    distance = null;

test(`Cargo capacity for vehicle type 'E' should be 50`, () => {
    cargo = cargoCapacity[vehicle.type.toUpperCase()];
    expect(cargo).toEqual(50);
});

test(`shortest path from 'A' to 'E' should be 16`, () => {
    shortestPath = findShortestPath(graph, vehicle.location, order.location);
    expect(shortestPath).toEqual(16);
});

test(`The value based on the distance 16 should be 25`, () => {
    distance = distanceTable(shortestPath);
    expect(distance).toEqual(25);
});

test('Score based on the deliver capacity and the current location of the vehicle should be 37.5', () => {
    const result = score(order.quantity, cargo, distance);
    expect(result).toEqual(37.5);
});

describe(`GET ${route}`, function () {
    it('responds with json', function (done) {
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
            .get(route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
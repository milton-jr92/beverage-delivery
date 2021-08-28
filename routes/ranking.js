const graph = require('../models/location');
const findShortestPath = require('../service/shortestDistance');
const cargoCapacity = require('../models/cargoCapacity');
const distanceTable = require('../models/distanceTable');
const score = require('../service/score');

module.exports = (app) => {
    let route = app.route('/v1/order/1/vehicle/ranking'); //get vehicles for each order
    let routeId = app.route('/v1/order/:id/vehicle/ranking'); //get vehicles for specific order

    route.get(async (req, res) => {
        //get orders & vehicles
        let arrOrders = await app.control.ordersDb.find();
        let arrVehicles = await app.control.vehiclesDb.find();
        let vehicles = {};

        //Each vehicle will receive an score for each store.        
        for (var store in arrOrders) {
            vehicles[arrOrders[store]['store']] = [];

            for (var vehicle in arrVehicles) {
                //djikistra algorithm to get the shortest path
                //source must be diff from destiny, otherwise the distance is zero
                let shortestPath = arrVehicles[vehicle]['location'] !== arrOrders[store]['location'] ? findShortestPath(graph, arrVehicles[vehicle]['location'], arrOrders[store]['location']) : 0;

                let this_cargoCapacity = cargoCapacity[arrVehicles[vehicle]['type']]; //get vehicle capacity
                let distance = distanceTable(shortestPath); //

                //This score is based on the deliver capacity and the current location of the vehicle.
                vehicles[arrOrders[store]['store']].push({
                    "id_vehicle": arrVehicles[vehicle]['_id'],
                    "model": arrVehicles[vehicle]['model'],
                    "location": arrVehicles[vehicle]['location'],
                    "capacity": this_cargoCapacity,
                    'score': score(arrOrders[store]['quantity'], this_cargoCapacity, distance)
                });
            }

            //order vehicles desc based on the score attribute
            vehicles[arrOrders[store]['store']].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            vehicles
        });
    });

    routeId.get(async (req, res) => {
        let order = await app.control.ordersDb.findId(req.params.id);
        let arrVehicles = await app.control.vehiclesDb.find();
        let vehicles = {};

        if (order != '' && order != null) {
            //Each vehicle will receive an score for each store.                
            vehicles[order['store']] = [];

            for (var vehicle in arrVehicles) {
                let shortestPath = arrVehicles[vehicle]['location'] !== order['location'] ? findShortestPath(graph, arrVehicles[vehicle]['location'], order['location']) : 0;

                let this_cargoCapacity = cargoCapacity[arrVehicles[vehicle]['type']];
                let distance = distanceTable(shortestPath);

                //This score is based on the deliver capacity and the current location of the vehicle.
                vehicles[order['store']].push({
                    "id_vehicle": arrVehicles[vehicle]['_id'],
                    "model": arrVehicles[vehicle]['model'],
                    "location": arrVehicles[vehicle]['location'],
                    "capacity": this_cargoCapacity,
                    'score': score(order['quantity'], this_cargoCapacity, distance)
                });
            }

            vehicles[order['store']].sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        }        

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            vehicles
        });
    });
}
const graph = require('../models/location');
const findShortestPath = require('../service/shortestDistance');
const cargoCapacity = require('../models/cargoCapacity');
const distanceTable = require('../models/distanceTable');
const score = require('../service/score');

module.exports = (app) => {
    let route = app.route('/v1/order/1/vehicle/ranking');

    route.get(async (req, res) => {        
        //get orders & vehicles
        let arrOrders = await app.control.ordersDb.find();
        let arrVehicles = await app.control.vehiclesDb.find();
        let arrRanking = {
            'ranking': []
        };

        //Each vehicle will receive an score for each store.
        //This score is based on the deliver capacity and the current location of the vehicle.
        for (var vehicle in arrVehicles) {
            for (var store in arrOrders) {
                console.log(`from ${arrVehicles[vehicle]['location']} to ${arrOrders[store]['location']}`);
                let shortestPath = arrVehicles[vehicle]['location'] !== arrOrders[store]['location'] ? findShortestPath(graph, arrVehicles[vehicle]['location'], arrOrders[store]['location']) : 0;
                console.log(`distance ${shortestPath}`);

                let this_cargoCapacity = cargoCapacity[arrVehicles[vehicle]['type']];
                let distance = distanceTable(shortestPath);

                console.log(`cargo ${this_cargoCapacity}`);
                console.log(`D ${distance}`);

                arrRanking['ranking'].push({
                    'score': score(arrOrders[store]['quantity'], this_cargoCapacity, distance)
                });
            }
        }
        
        res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        res.json({
            arrRanking
        });      
    });
}
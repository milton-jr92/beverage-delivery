module.exports = (app) => {
    let route = app.route('/v1/order/1/vehicle/ranking');

    route.get(async (req, res) => {        
        //get orders & vehicles
        let arrOrders = await app.control.ordersDb.find();
        let arrVehicles = await app.control.vehiclesDb.find();

        //Each vehicle will receive an score for each store.
        //This score is based on the deliver capacity and the current location of the vehicle.
        for (var vehicle in arrVehicles) {
            for (var store in arrOrders) {
                console.log(`from ${arrVehicles[vehicle]['location']} to ${arrOrders[store]['location']}`);
            }
        }
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            arrOrders
        });      
    });
}
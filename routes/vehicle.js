// let neDb = require('nedb');
// let db = new neDb({
//     filename: 'vehicles.db',
//     autoload: true
// });

module.exports = (app) => {
    let route = app.route('/v1/vehicle');

    route.post((req, res) => {
        app.control.vehiclesDb.insert(req.body, res);       

        // res.status(200).json(vehicle);
        // db.insert(req.body, (err, vehicle) => {
        //     if (err) {
        //         app.utils.error.send(err, req, res);
        //     }
        //     else {
        //         res.status(200).json(vehicle);
        //     }
        // });        
    });     
}
module.exports = (app) => {
    let route = app.route('/v1/vehicle');

    route.post((req, res) => {
        app.control.vehiclesDb.insert(req.body, res);
    });     
}
module.exports = (app) => {
    let route = app.route('/v1/order');

    route.post((req, res) => {
        if (!app.utils.validator.maxQtd(app, req, res)) {
            return false;
        }

        app.control.ordersDb.insert(req.body, res);                
    });     
}
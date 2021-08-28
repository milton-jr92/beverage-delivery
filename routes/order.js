module.exports = (app) => {
    let route = app.route('/v1/order');

    route.post(async (req, res) => {
        if (!app.utils.validator.maxQtd(app, req, res)) {
            return false;
        }

        let order = await app.control.ordersDb.insert(req.body);
        
        res.status(200).json(order);
    });     
}
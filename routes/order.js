module.exports = (app) => {
    let route = app.route('/v1/order');

    route.post((req, res) => {
        app.control.ordersDb.insert(req.body, res); 
        // db.insert(req.body, (err, order) => {
        //     if (err) {
        //         app.utils.error.send(err, req, res);
        //     }
        //     else {
        //         res.status(200).json(order);
        //     }
        // });        
    });     
}
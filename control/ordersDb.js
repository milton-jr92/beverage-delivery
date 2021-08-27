let neDb = require('nedb');
let db = new neDb({
    filename: 'orders.db',
    autoload: true
});

module.exports = {    
    insert: (body, res) => {
        db.insert(body, (err, order) => {
            if (err) {
                app.utils.error.send(err, req, res);
            }
            else {                
                res.status(200).json(order);
            }
        }); 
    }, 
    
    find: () => {
        return new Promise(function (resolve, reject) {
            db.find({}).sort({quantity: 1}).exec((err, order) => { // 1: asc; -1: desc
                if (err) {
                    reject(err);
                    // app.utils.error.send(err, req);
                }
                else {
                    resolve(order);
                    // return vehicle;
    
                    // res.statusCode = 200;
                    // res.setHeader('Content-Type', 'application/json');
                    // res.json({
                    //     vehicle
                    // });
                }
            });
        });        
    },

    findId: (orderId) => {
        return new Promise(function (resolve, reject) {
            db.findOne({_id: orderId}).exec((err, order) => {  // req.params.parametroDaRota 'name', 'email' etc.
                if (err) {
                    reject(err);
                    // app.utils.error.send(err, req, res);
                }
                else {
                    resolve(order);                    
                }
            });
        });
    }
} 
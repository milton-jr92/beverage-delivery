let neDb = require('nedb');
let db = new neDb({
    filename: 'vehicles.db',
    autoload: true
});

module.exports = {    
    insert: (body, res) => {
        db.insert(body, (err, vehicle) => {
            if (err) {
                app.utils.error.send(err, req, res);
            }
            else {                
                res.status(200).json(vehicle);
            }
        }); 
    },
    
    find: () => {
        return new Promise(function (resolve, reject) {
            db.find({}).sort({location: 1}).exec((err, vehicle) => { // 1: asc; -1: desc
                if (err) {
                    reject(app.utils.error.send(err, req));
                    // app.utils.error.send(err, req);
                }
                else {
                    resolve(vehicle);
                    // return vehicle;
    
                    // res.statusCode = 200;
                    // res.setHeader('Content-Type', 'application/json');
                    // res.json({
                    //     vehicle
                    // });
                }
            });
        });        
    }
} 
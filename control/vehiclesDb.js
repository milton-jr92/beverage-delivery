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
    }    
} 
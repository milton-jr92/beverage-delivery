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
    }    
} 
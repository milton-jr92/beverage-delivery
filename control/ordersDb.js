let neDb = require('nedb');
let db = new neDb({
    filename: 'orders.db',
    autoload: true
});

module.exports = {    
    insert: (body) => {
        return new Promise(function (resolve, reject) {
            db.insert(body, (err, order) => {
                if (err) {
                    reject(err);                    
                }
                else {  
                    resolve(order);
                }
            });
        });         
    }, 
    
    find: () => {
        return new Promise(function (resolve, reject) {
            db.find({}).sort({quantity: 1}).exec((err, order) => { // 1: asc; -1: desc
                if (err) {
                    reject(err);                    
                }
                else {
                    resolve(order);                    
                }
            });
        });        
    },

    findId: (orderId) => {
        return new Promise(function (resolve, reject) {
            db.findOne({_id: orderId}).exec((err, order) => {  
                if (err) {
                    reject(err);                    
                }
                else {
                    resolve(order);                    
                }
            });
        });
    }
} 
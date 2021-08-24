const express = require('express');
const routes = express.Router();

routes.get('/v1/order', (req, res) => {
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/html');
    res.end('<h1>Order</h1>');
});

module.exports = routes;
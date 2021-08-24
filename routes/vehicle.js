const express = require('express');
const routes = express.Router();

routes.get('/v1/vehicle', (req, res) => {
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/html');
    res.end('<h1>Vehicle</h1>');
});

module.exports = routes;
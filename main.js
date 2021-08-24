const express = require('express');
const routesIndex = require('./routes/index');
const routesOrder = require('./routes/order');
const routesVehicle = require('./routes/vehicle');

let app = express();

app.use(routesIndex);
app.use(routesOrder);
app.use(routesVehicle);

app.listen(9000, '127.0.0.1', () => {
    console.log('Server is running');
})
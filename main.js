const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

let app = express();
let port = 9000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

consign()
    .include('routes')
    .include('control')
    .include('utils')
    .into(app);

app.listen(port, '127.0.0.1', () => {
    console.log(`Server is running on port ${port}`);
});
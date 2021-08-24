module.exports = (app) => {
    app.get('/v1/order/1/vehicle/ranking', (req, res) => {
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'text/html');
        res.end('<h1>Ranking</h1>');
    });
}
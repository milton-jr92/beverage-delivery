module.exports = {
    send: (err, req, res, code = 400) => {
        res.status(code).json({
            error: err
        });
    }
}
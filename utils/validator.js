module.exports = {
    maxQtd:(app, req, res) => {
        let errors = '';

        if (parseInt(req.body.quantity) > 50) {
            errors = "The Quantity must be maximum 50";
        }        

        if (errors != '') {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }
    }
}
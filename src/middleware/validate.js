const validator = require('../helpers/validator');

const saveCar = (req, res, next) => {
    const validationRules = {
        model: 'required|string',
        make: 'required|string',
        year: 'required|integer',
        price: 'required|integer',
        color: 'required|string',
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}


module.exports = {
    saveCar
}
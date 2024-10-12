const router = require('express').Router();

const carsRouter = require('./cars');


router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/cars', carsRouter);

module.exports = router;
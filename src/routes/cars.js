const router = require('express').Router();
const carsController = require('../controllers/cars');
const { isAuthenticated } = require('../middleware/authenticate');
const validate = require('../middleware/validate');

router.get('/', carsController.getAllCars);
router.get('/:id', carsController.getCarById);
router.post('/', isAuthenticated, validate.saveCar, carsController.createCar);
router.put('/:id', isAuthenticated, validate.saveCar, carsController.updateCar);
router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;
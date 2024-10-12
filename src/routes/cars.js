const router = require('express').Router();
const carsController = require('../controllers/cars');
const validate = require('../middleware/validate');

router.get('/', carsController.getAllCars);
router.get('/:id', carsController.getCarById);
router.post('/', validate.saveCar, carsController.createCar);
router.put('/:id', validate.saveCar, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

module.exports = router;
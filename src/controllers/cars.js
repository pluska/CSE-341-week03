const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllCars = async (req, res) => {
    //#swagger.tags=['cars']
    const result = await mongodb.getDatabase().collection('cars').find();
    if (result) {
        result.toArray().then((cars) => {
            res.status(200).json(cars);
        });
    }
    else {
        res.status(500).json({ error: 'An error occurred while retrieving cars.' });
    }
};

const getCarById = async (req, res) => {
    //#swagger.tags=['cars']
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('cars').find({ _id: id });
    if (result) {
        result.toArray().then((cars) => {
            res.status(200).json(cars[0]);
        });
    }
    else {
        res.status(404).json({ error: 'Car not found.' });
    }
};

const createCar = async (req, res) => {
    //#swagger.tags=['cars']
    const newCar = {
        model: req.body.model,
        make: req.body.make,
        year: req.body.year,
        price: req.body.price,
        color: req.body.color,
        };
    const result = await mongodb.getDatabase().collection('cars').insertOne(newCar);
    if (result.insertedCount === 0) {
        res.status(500).json({ error: 'An error occurred while creating the Car.' });
        return;
    }
    res.status(201).json({ message: 'Car created successfully.' });
};

const updateCar = async (req, res) => {
    //#swagger.tags=['cars']
    const id = new ObjectId(req.params.id);
    const updateCar = {
        model: req.body.model,
        make: req.body.make,
        year: req.body.year,
        price: req.body.price,
        color: req.body.color,
        };
    const result = await mongodb.getDatabase().collection('cars').replaceOne(
        { _id: id },
        updateCar,
    );
    if (result.modifiedCount === 0) {
        console.log(result);
        res.status(500).json({ error: 'An error occurred while updating the Car.' });
        return;
    }
    res.status(200).json({ message: 'Car updated successfully.' });
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['cars']
    const id = req.params.id;
    const result = await mongodb.getDatabase().collection('cars').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        res.status(500).json({ error: 'An error occurred while deleting the Car.' });
        return;
    }
    res.status(200).json({ message: 'Car deleted successfully.' });
};

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
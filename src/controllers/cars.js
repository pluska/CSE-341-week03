const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllCars = async (req, res) => {
    //#swagger.tags=['cars']
    try {
        const list = await mongodb.getDatabase().collection('cars').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getCarById = async (req, res) => {
    //#swagger.tags=['cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    const id = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().collection('cars').findOne({ _id: id });
        if (!result) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const createCar = async (req, res) => {
    //#swagger.tags=['cars']
    console.log(req.body);
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
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
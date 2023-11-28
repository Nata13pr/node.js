const Car = require('../dataBase/Car');
const CError = require('../error/CustomError')

async function getAllCars(req, res, next) {
    try {
        const cars = await Car.find();

        res.json(cars);
    } catch (e) {
        next(e);
    }
}

async function getById(req, res, next) {
    try {

        const {carId = ''} = req.params;

        const car = await Car.findOne({_id: carId})

        res.json(car);
    } catch (e) {
        next(e);
    }
}

async function createCar(req, res, next) {
    try {
        await Car.create(req.body);

        res.status(201).json("User was created");
    } catch (e) {
        next(e)
    }
}

async function deleteCar(req, res, next) {
    try {
        const {carId = ""} = req.params;

        await Car.deleteOne({_id: carId});

        res.status(201).json("User was deleted")

    } catch (e) {
        next(e)
    }
}

async function updateCar(req, res, next) {
    try {
        const {carId = ""} = req.params;
        await Car.findOneAndUpdate(
            {_id: carId},
            {
                $set: {
                    'brand': req.body.brand,
                    'year': req.body.year
                }
            },
            {new: true}
        );

        res.status(201).json("User was Updated")
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createCar,
    deleteCar,
    getAllCars,
    getById,
    updateCar,
};

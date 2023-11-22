const cars = require('../dataBase/cars');

function getAllCars(req, res) {
    try {
        res.json(cars);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

function getById(req, res) {
    try {
        const carIndex = +req.params.carId;

        if (isNaN(carIndex) || carIndex < 0) {
            res.status(400).json("Please enter valid Id");
            return;
        }
        const car = cars[carIndex];

        if (!car) {
            res.status(404).json('User with ID ${carIndex} is not found.')
            return;
        }

        res.json(car);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

function createCar(req, res) {
    try {
        cars.push({
            id: 888,
            brand: "VOLVO",
            yesr: 1999,
        });

        res.status(201).json("User was created");
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error");
    }
}

function deleteCar(req, res) {
    try {
        const carIndex = +req.params.carId;

        if (isNaN(carIndex) || carIndex < 0) {
            res.status(400).json("Please enter valid ID");
            return;
        }

        const car = cars[carIndex];

        if (!car) {
            res.status(404).json(`User with ID ${userIndex} is not found`);
            return;
        }

        const filteredCars = cars.filter((car, idx) => idx !== carIndex);
        res.json(filteredCars);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error");
    }
}

function updateCar(req, res) {
    try {
        const carIndex = +req.params.carId;

        if (isNaN(carIndex) || carIndex < 0) {
            res.status(400).json("Please enter valid ID");
            return;
        }
        const car = cars[carIndex];

        if (!car) {
            res.status(404).json(`User with ID ${carIndex} is not found`);
            return;
        }

        const updatedCar = {
            ...car,
            id: 90,
            brand: "NewBMW",
            year: 1990,
        };

        cars[carIndex] = updatedCar;
        res.json(updatedCar);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error");
    }
}

module.exports = {
    createCar,
    deleteCar,
    getAllCars,
    getById,
    updateCar,
};

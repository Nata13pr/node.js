const express = require('express');
const cars = require('./dataBase/cars');
const app = express();

app.get('/', (req, res) => {
    res.json('HELLO');
})

app.get('/cars', (req, res) => {
    res.json(cars)
})


//Create
app.get('/cars/create', (req, res) => {
    cars.push({id: 111, brand: 'BMW', year: 2023});

    res.status(201).json('Users was created');
})

app.get('/cars/:carId/delete', (req, res) => {
    const carIndex = +req.params.carId;

    if (isNaN(carIndex) || carIndex < 0) {
        res.status(400).json('Please enter valid ID');
        return;
    }

    const car = cars[carIndex];

    if (!car) {
        res.status(404).json(`User with ID ${userIndex} is not found`);
        return;
    }

    const filteredCars = cars.filter((car, idx) => idx !== carIndex)
    res.json(filteredCars)
})

app.get('/cars/:carId/update', (req, res) => {
    const carIndex = +req.params.carId;

    if (isNaN(carIndex) || carIndex < 0) {
        res.status(400).json('Please enter valid ID');
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
        brand: 'NewBMW',
        year: 1990,
    }

    cars[carIndex] = updatedCar;
    res.json(updatedCar)
})

app.get('/cars/:carId', (req, res) => {
    const carIndex = +req.params.carId;

    if (isNaN(carIndex) || carIndex < 0) {
        res.status(400).json('Please enter valid ID');
        return;
    }

    const car = cars[carIndex];

    if (!car) {
        res.status(404).json(`User with ID ${carIndex} is not found.jhkjhljl`);
        return;
    }

    res.json(car)
})

app.listen(5000, () => {
    console.log('Server listen 5000')
})
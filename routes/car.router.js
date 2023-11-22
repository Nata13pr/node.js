const carRouter = require("express").Router();

const carController = require("../controllers/car.controller");

carRouter.get("/", carController.getAllCars);
carRouter.post("/", carController.createCar);
carRouter.delete("/:carId", carController.deleteCar);
carRouter.put("/:carId", carController.updateCar);
carRouter.get("/:carId", carController.getById);

module.exports = carRouter;

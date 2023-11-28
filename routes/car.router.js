const carRouter = require("express").Router();

const carController = require("../controllers/car.controller");
const carMdlwr=require('../middlewares/car.middleware')

carRouter.get("/", carController.getAllCars);
carRouter.post("/",carMdlwr.checkCarOnCrease, carController.createCar);
carRouter.delete("/:carId",carMdlwr.checkIfCarAvailable,carMdlwr.checkCarById, carController.deleteCar);
carRouter.put("/:carId",carMdlwr.checkIfCarAvailable,carMdlwr.checkCarById, carController.updateCar);
carRouter.get("/:carId",carMdlwr.checkCarById,carMdlwr.checkIfCarAvailable, carController.getById);

module.exports = carRouter;

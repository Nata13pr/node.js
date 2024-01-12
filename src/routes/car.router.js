const carRouter = require( 'express' ).Router();

const carController = require( '../controllers/car.controller' );
const authMdlwr = require( '../middlewares/auth.middleware' );
const carMdlwr = require( '../middlewares/car.middleware' );

carRouter.get( '/', carController.getAllCars );
carRouter.post( '/',  carMdlwr.isNewCarValid,
       carMdlwr.isEmailRegistered,carMdlwr.checkCarOnCreate, carController.createCar );
carRouter.delete( '/:carId',authMdlwr.checkAccessToken,carMdlwr.checkIfCarAvailable,carMdlwr.checkCarById, carController.deleteCar );
carRouter.put( '/:carId',authMdlwr.checkAccessToken,carMdlwr.checkIfCarAvailable,carMdlwr.checkCarById, carController.updateCar );
carRouter.get( '/:carId',authMdlwr.checkAccessToken,carMdlwr.checkCarById,carMdlwr.checkIfCarAvailable, carController.getById );

module.exports = carRouter;

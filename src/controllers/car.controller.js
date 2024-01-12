const CError = require( '../error/CustomError' );
const { carPresenter } = require( '../presenters/car.presenter' );
const {
       updateOneCar,
       findCars,
       findOneCar,
       deleteOneCar,
       createNewCar
} = require( '../services/car.service' );
const { hashPassword } = require( '../services/password.service' );

async function getAllCars( req, res, next ) {
       try {
              const cars = await findCars( req.query ).exec();

              const carForResponse = cars.map( ( u ) => carPresenter( u ) );

              res.json( carForResponse );

       } catch ( e ) {
              next( e );
       }
}

async function getById( req, res, next ) {
       try {
              const { carId = '' } = req.params;

              const car = await findOneCar( { _id : carId } );

              if ( !car ) {
                     throw new CError( `Car with ID ${carId} is not found`, 404 );
              }

              res.json( car );
       } catch ( e ) {
              next( e );
       }
}

async function createCar( req, res, next ) {
       try {
              const hash = await hashPassword( req.body.password );

              const newCar = await createNewCar( {
                     ...req.body,
                     password : hash,
              } );

              const carForResponse = carPresenter( newCar );

              res.status( 201 ).json( carForResponse );


       } catch ( e ) {
              next( e );
       }
}

async function deleteCar( req, res, next ) {
       try {
              const { carId = '' } = req.params;

              await deleteOneCar( { _id : carId } );

              res.status( 201 ).json( 'Car was deleted' );

       } catch ( e ) {
              next( e );
       }
}

async function updateCar( req, res, next ) {
       try {
              const { id } = req.params;

              const updatedCar = await updateOneCar( { _id : id }, req.body );

              const carForResponse = carPresenter( updatedCar );

              res.status( 201 ).json( carForResponse );
       } catch ( e ) {
              next( e );
       }
}

module.exports = {
       createCar,
       deleteCar,
       getAllCars,
       getById,
       updateCar,
};

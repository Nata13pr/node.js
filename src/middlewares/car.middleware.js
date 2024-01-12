const { Types } = require( 'mongoose' );

const Car = require( '../dataBase/Car' );
const CError = require( '../error/CustomError' );
const carValidator = require( '../validators/car.validator' );

module.exports = {
       isNewCarValid : ( req, res, next ) => {
              try {
                     const { error, value } = carValidator.newCarValidator.validate(
                            req.body
                     );

                     if ( error ) {
                            throw new CError( error.details[0].message );
                     }

                     req.body = value;

                     next();
              } catch ( e ) {
                     next( e );
              }
       },

       isEmailRegistered : async ( req, res, next ) => {
              try {
                     const { email } = req.body;

                     const carByEmail = await Car.findOne( { email } );

                     if ( carByEmail ) {
                            throw new CError( 'Car with such email already registered', 409 );
                     }

                     next();
              } catch ( e ) {
                     next( e );
              }
       },
       checkIsCarPresent : async ( req, res, next ) => {
              try {
                     const { email } = req.body;


                     const carByEmail = await Car.findOne( { email } );

                     if ( !carByEmail ) {
                            throw new CError( 'Car not found', 409 );
                     }

                     req.car = carByEmail;

                     next();
              } catch ( e ) {
                     next( e );
              }
       },
       checkCarOnCreate : ( req, res, next ) => {
              try {
                     const { value : { brand = '',year = '' } } = carValidator.newCarValidator.validate( req.body );

                     if ( !brand || !year ) {
                            throw new CError( 'Some field is missing' );
                     }

                     if ( year.length < 4 || year.length > 5 ) {
                            throw new CError( 'Year should have 4 symbols' );
                     }
                     next();
              } catch ( e ) {
                     next( e );
              }
       },
       checkCarById : ( req, res, next ) => {
              try {
                     const {  carId } = req.params;

                     if ( !Types.ObjectId.isValid( carId ) ) {
                            return new CError( 'Please enter valid Id' );
                     }

                     next();

              } catch ( e ) {
                     next( e );
              }
       },
       checkIfCarAvailable : async ( req, res, next ) => {
              try {
                     const { carId = '' } = req.params;

                     const car = await Car.findOne( { _id : carId } );

                     if ( !car ) {
                            throw new CError( `Car with ID ${carId} is not found.` );

                     }
                     next();
              } catch ( e ) {
                     next( e );
              }
       }
};
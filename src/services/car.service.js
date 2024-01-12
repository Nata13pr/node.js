const Car = require( '../dataBase/Car' );

module.exports = {
       findCars : ( params = {} ) => {
              return Car.find( params );
       },

       findOneCar : ( params = {} ) => {
              return Car.findOne( params );
       },

       createNewCar : ( car ) => {
              return Car.create( car );
       },

       updateOneCar : ( params, carData ) => {
              return Car.findOneAndUpdate( carData );
       },

       deleteOneCar : ( params ) => {
              return Car.deleteOne( params );
       },
};

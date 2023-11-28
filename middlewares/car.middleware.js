const CError = require('../error/CustomError');
const Car = require('../dataBase/Car');

module.exports = {
    checkCarOnCrease: (req, res, next) => {
        try {
            const {brand = '', year = ''} = req.body;

            if (!brand || !year) {
                throw new CError('Some field is missing');
            }

            if (year.length < 4 || year.length > 5) {
                throw new CError('Year should have 4 symbols')
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    checkCarById: (req, res, next) => {
        try {
            const carIndex = req.params.carId;

            if (!isNaN(carIndex)|| carIndex < 0) {
                throw new CError("Please enter valid Id");
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    checkIfCarAvailable:async (req,res,next)=>{
        try{
            const {carId = ''} = req.params;

            const car = await Car.findOne({_id: carId})
            console.log(car)

            if (!car) {
                throw new CError(`User with ID ${carId} is not found.`)

            }
            next()
        }catch (e) {
            next(e)
        }
    }
}
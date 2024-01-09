const { WELCOME,FORGOT_PASSWORD } = require( '../constants/email.action.enum' );
const ActionToken = require( '../dataBase/ActionToken' );
const Car = require( '../dataBase/Car' );
const OAuth = require( '../dataBase/OAuth' );
const emailService = require( '../services/email.service' );
const passwordService = require( '../services/password.service' );
const { generateAuthTokens,generateActionToken } = require( '../services/token.service' );

module.exports = {
    login : async ( req, res, next ) => {
        try {
            const { password : hashPassword, _id,brand } = req.car;
            const { password } = req.body;

            await emailService.sendEmail( 'nata13pr@gmail.com',WELCOME,{
                userBrand : brand,
            } );

            await passwordService.comparePassword( hashPassword, password );

             // await OAuth.deleteMany( { carId : _id } );

            const tokens = generateAuthTokens();

            await OAuth.create( {
                carId : _id,
                ...tokens,
            } );

            res.json( {
                car : req.car,
                ...tokens,
            } );
        } catch ( e ) {
            next( e );
        }
    },
    forgotPassword : async( req,res,next ) => {
      try{
          const{ _id,brand } = req.car;
          const token = generateActionToken( FORGOT_PASSWORD,{ brand,_id } );

await ActionToken.create( {
    carId : _id,
    token,
    actionType : FORGOT_PASSWORD,
} );

          await emailService.sendEmail( 'nata13pr@gmail.com',FORGOT_PASSWORD,{
              userBrand : brand,
              token,
          } );
          res.json( 'ok' );
      }catch( e ){
          next( e );
      }
    },
    setForgotPassword : async( req,res,next ) => {
        try {
            const { _id } = req.car;
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword( password );
            const updatedCar = await Car.findByIdAndUpdate(
                _id,
                { password : hashPassword },
                { new : true }
            );

            await ActionToken.deleteOne( {
                actionType : FORGOT_PASSWORD,
                carId : _id,
            } );
            res.json( updatedCar );
        }catch( e ){
                next( e );
            }
        },

    refreshToken : async ( req, res, next ) => {
        try {
            const { refresh_token } = req.car;

            const tokenInfo = await OAuth.findOne( { refresh_token } ).populate( 'carId' );
            if ( !tokenInfo ) {
                return res.status( 401 ).json( { error : 'Invalid refresh token' } );
            }

            const { carId } = tokenInfo;

            await OAuth.findOneAndDelete( { refresh_token } );

            const tokens = generateAuthTokens();

            await OAuth.create( {
                carId : carId,
                ...tokens,
            } );

            res.json( {
                car : req.carId,
                ...tokens,
            } );
        } catch ( e ) {
            next( e );
        }
    },
};

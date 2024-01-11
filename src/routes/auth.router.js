const carRouter = require( 'express' ).Router();

const { FORGOT_PASSWORD } = require( '../constants/email.action.enum' );
const authController = require( '../controllers/auth.controller' );
const authMdlwr = require( '../middlewares/auth.middleware' );
const carMdlwr = require( '../middlewares/car.middleware' );

carRouter.post( '/login', carMdlwr.checkIsCarPresent, authController.login );
carRouter.post(
    '/refresh',
    authMdlwr.checkRefreshToken,
    authController.refreshToken
);
carRouter.post( '/password/forgot',carMdlwr.checkIsCarPresent,authController.forgotPassword );
 carRouter.post( '/password/forgot/set',authMdlwr.checkActionToken( FORGOT_PASSWORD ),authController.setForgotPassword );
carRouter.post( '/account-blocked',carMdlwr.checkIsCarPresent, authController.accountBlocked );

 module.exports = carRouter;

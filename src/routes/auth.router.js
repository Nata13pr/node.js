const userRouter = require( 'express' ).Router();

const authController = require( '../controllers/auth.controller' );
const authMdlwr = require( '../middlewares/auth.middleware' );
const carMdlwr = require( '../middlewares/car.middleware' );

userRouter.post( '/login', carMdlwr.checkIsCarPresent, authController.login );
userRouter.post(
    '/refresh',
    authMdlwr.checkRefreshToken,
    authController.refreshToken
);

module.exports = userRouter;

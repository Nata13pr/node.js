const ActionToken = require( '../dataBase/ActionToken' );
const OAuth = require( '../dataBase/OAuth' );
const CError = require( '../error/CustomError' );
const {
    checkAccessToken,
    checkRefreshToken,
    checkActionToken,
} = require( '../services/token.service' );

module.exports = {
    checkAccessToken : async ( req, res, next ) => {
        try {
            const access_token = req.get( 'Authorization' );

            if ( !access_token ) {
                throw new CError( 'No token', 401 );
            }

            checkAccessToken( access_token );

            const tokenInfo = await OAuth.findOne( { access_token } ).populate(
                'carId'
            );

            if ( !tokenInfo ) {
                throw new CError( 'Token not valid', 401 );
            }

            req.car = tokenInfo.carId;

            next();
        } catch ( e ) {
            next( e );
        }
    },

    checkRefreshToken : async ( req, res, next ) => {
        try {
            const refresh_token = req.get( 'Authorization' );

            if ( !refresh_token ) {
                throw new CError( 'No token', 401 );
            }

            checkRefreshToken( refresh_token );

            const tokenInfo = await OAuth.findOne( { refresh_token } ).populate(
                'carId'
            );

            if ( !tokenInfo ) {
                throw new CError( 'Token not valid', 401 );
            }

            req.car = tokenInfo;
            next();
        } catch ( e ) {
            next( e );
        }
    },
        checkActionToken : ( actionType ) => async( req,res,next ) => {
            try{
                const action_token = req.get( 'Authorization' );

                if( !action_token ){
                    throw new CError( 'No token',401 );
                }

                checkActionToken( action_token,actionType );

                const tokenInfo = await ActionToken.findOne( {
                    token : action_token,
                } ).populate( 'carId' );

                if( !tokenInfo ){
                    throw new CError( 'Token not valid',401 );
                }
                req.car = tokenInfo.carId;
                next();
            }catch( e ){
                next( e );
            }
        }
};

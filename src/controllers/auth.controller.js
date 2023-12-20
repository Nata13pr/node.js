const OAuth = require( '../dataBase/OAuth' );
const passwordService = require( '../services/password.service' );
const { generateAuthTokens } = require( '../services/token.service' );

module.exports = {
    login : async ( req, res, next ) => {
        try {
            const { password : hashPassword, _id } = req.car;
            const { password } = req.body;

            await passwordService.comparePassword( hashPassword, password );

            await OAuth.deleteMany( { carId : _id } );

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

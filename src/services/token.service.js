const jwt = require( 'jsonwebtoken' );

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = require( '../constants/configs' );
const CustomError = require( '../error/CustomError' );

function generateAuthTokens( payload = {} ) {
    const access_token = jwt.sign( payload, ACCESS_TOKEN_SECRET, {
        // expiresIn : '15m',
        expiresIn : '1m',
    } );
    const refresh_token = jwt.sign( payload, REFRESH_TOKEN_SECRET, {
        expiresIn : '30d',
    } );

    return {
        access_token,
        refresh_token,
    };
}

function checkAccessToken( token = '' ) {
    try {
        return jwt.verify( token, ACCESS_TOKEN_SECRET );
    } catch ( e ) {
        throw new CustomError( 'Token not valid', 401 );
    }
}

function checkRefreshToken( token = '' ) {
    try {
        return jwt.verify( token, REFRESH_TOKEN_SECRET );
    } catch ( e ) {
        throw new CustomError( 'Token not valid', 401 );
    }
}

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    generateAuthTokens,
};

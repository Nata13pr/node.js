const Joi = require( 'joi' );

const { emailValidator } = require( './share' );
const { PASSWORD_REGEX } = require( '../constants/constant' );

const carSubScheme = {
       brand : Joi.string().alphanum().min( 2 ).max( 100 ).required(),
       year : Joi.number().integer().min( 1980 ).max( 2023 ),
};

module.exports = {
       newCarValidator : Joi.object( {
              ...carSubScheme,
              email : emailValidator.required(),
              password : Joi.string().regex( PASSWORD_REGEX ).required(),
       } ),

       updateCarValidator : Joi.object( carSubScheme ),
};
